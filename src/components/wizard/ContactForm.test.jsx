import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createLead } from '../../api/client'
import { ContactForm } from './ContactForm'

vi.mock('../../api/client', () => ({
  createLead: vi.fn(),
}))

const wizardState = {
  projectTypeId: 'landing',
  entityId: 'pyme',
  serviceIds: ['seo', 'domino-hosting'],
  paymentMethodId: 'transferencia',
  discountCode: 'lanzamiento',
}

describe('ContactForm', () => {
  beforeEach(() => {
    createLead.mockReset()
  })

  it('submits the wizard ids plus contact data and shows the confirmation with id and total', async () => {
    const user = userEvent.setup()
    createLead.mockResolvedValue({
      id: 123,
      created_at: '2026-10-08T00:00:00Z',
      name: 'Ana García',
      email: 'ana@example.com',
      total: 150000,
    })

    render(<ContactForm wizardState={wizardState} />)

    await user.type(screen.getByLabelText(/nombre/i), 'Ana García')
    await user.type(screen.getByLabelText(/email/i), 'ana@example.com')
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    expect(createLead).toHaveBeenCalledTimes(1)
    expect(createLead).toHaveBeenCalledWith({
      name: 'Ana García',
      email: 'ana@example.com',
      phone: null,
      project_type_id: 'landing',
      entity_id: 'pyme',
      service_ids: ['seo', 'domino-hosting'],
      payment_method_id: 'transferencia',
      discount_code: 'lanzamiento',
    })

    expect(await screen.findByText(/pedido #123/i)).toBeInTheDocument()
    expect(screen.getByText(/ana@example\.com/)).toBeInTheDocument()
    expect(screen.getByText(/150\.000/)).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('normalizes an empty phone to null', async () => {
    const user = userEvent.setup()
    createLead.mockResolvedValue({ id: 1, email: 'a@b.com', name: 'Ana', total: 100 })

    render(<ContactForm wizardState={wizardState} />)

    await user.type(screen.getByLabelText(/nombre/i), 'Ana')
    await user.type(screen.getByLabelText(/email/i), 'ana@example.com')
    await user.type(screen.getByLabelText(/teléfono/i), '   ')
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    await waitFor(() => expect(createLead).toHaveBeenCalledTimes(1))
    expect(createLead.mock.calls[0][0].phone).toBeNull()
  })

  it('does not call createLead when the email is invalid', async () => {
    const user = userEvent.setup()
    render(<ContactForm wizardState={wizardState} />)

    await user.type(screen.getByLabelText(/nombre/i), 'Ana García')
    await user.type(screen.getByLabelText(/email/i), 'esto-no-es-email')
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    expect(screen.getByText(/email válido/i)).toBeInTheDocument()
    expect(createLead).not.toHaveBeenCalled()
  })

  it('does not call createLead when a payment method is missing', async () => {
    const user = userEvent.setup()
    render(<ContactForm wizardState={{ ...wizardState, paymentMethodId: null }} />)

    await user.type(screen.getByLabelText(/nombre/i), 'Ana García')
    await user.type(screen.getByLabelText(/email/i), 'ana@example.com')
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    expect(screen.getByTestId('form-error')).toHaveTextContent(/forma de pago/i)
    expect(createLead).not.toHaveBeenCalled()
  })

  it('shows a retryable error and keeps the typed data when the request fails', async () => {
    const user = userEvent.setup()
    createLead.mockRejectedValue(new Error('boom'))

    render(<ContactForm wizardState={wizardState} />)

    const nameInput = screen.getByLabelText(/nombre/i)
    await user.type(nameInput, 'Ana García')
    await user.type(screen.getByLabelText(/email/i), 'ana@example.com')
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/no pudimos enviar/i)
    expect(nameInput).toHaveValue('Ana García')
    expect(screen.getByRole('button', { name: /enviar/i })).toBeEnabled()
  })

  it('disables the submit button while the request is in flight', async () => {
    const user = userEvent.setup()
    let resolveLead
    createLead.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveLead = resolve
        }),
    )

    render(<ContactForm wizardState={wizardState} />)

    await user.type(screen.getByLabelText(/nombre/i), 'Ana García')
    await user.type(screen.getByLabelText(/email/i), 'ana@example.com')
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    expect(screen.getByRole('button', { name: /enviando/i })).toBeDisabled()

    await act(async () => {
      resolveLead({ id: 9, name: 'Ana', email: 'ana@example.com', total: 100 })
    })

    expect(await screen.findByText(/pedido #9/i)).toBeInTheDocument()
  })
})
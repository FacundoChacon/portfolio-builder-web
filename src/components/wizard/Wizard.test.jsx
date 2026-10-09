import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getCatalog, getQuote } from '../../api/client'
import { Wizard } from './Wizard'

vi.mock('../../api/client', () => ({
  createLead: vi.fn(),
  getCatalog: vi.fn(),
  getQuote: vi.fn(),
  ApiError: class ApiError extends Error {},
}))

const catalog = {
  project_types: [
    { id: 'landing', name: 'Landing', base_price: 100000, description: 'Una página' },
  ],
  entities: [{ id: 'pyme', name: 'Pyme', multiplier: 1.5 }],
  services: [{ id: 'seo', name: 'SEO', price: 20000, description: 'Posicionamiento' }],
  payment_methods: [{ id: 'transferencia', name: 'Transferencia' }],
  discounts: [{ id: 'lanzamiento', name: 'Lanzamiento', percent: 10, description: '', code: 'lanzamiento' }],
}

const quote = {
  subtotal: 150000,
  discount_percent: 0,
  discount_amount: 0,
  total: 150000,
  breakdown: { project_type: 'landing', entity_multiplier: 1.5, services: [] },
}

describe('Wizard', () => {
  beforeEach(() => {
    getCatalog.mockResolvedValue(catalog)
    getQuote.mockResolvedValue(quote)
  })

  it('blocks advancing without a required selection and shows no price yet', async () => {
    render(<Wizard />)

    expect(await screen.findByText(/¿Qué tipo de proyecto/i)).toBeInTheDocument()
    expect(screen.getByTestId('live-total')).toHaveTextContent('—')
    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeDisabled()
    expect(getQuote).not.toHaveBeenCalled()
  })

  it('loads the live price from the backend once a project type and entity are chosen', async () => {
    const user = userEvent.setup()
    render(<Wizard />)

    await user.click(await screen.findByRole('button', { name: /Landing/i }))
    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeEnabled()
    await user.click(screen.getByRole('button', { name: 'Siguiente' }))

    await user.click(await screen.findByRole('button', { name: /Pyme/i }))

    await waitFor(() => expect(getQuote).toHaveBeenCalledTimes(1))
    expect(getQuote.mock.calls[0][0]).toEqual({
      project_type_id: 'landing',
      entity_id: 'pyme',
      service_ids: [],
      discount_code: null,
    })
    expect(await screen.findByTestId('live-total')).toHaveTextContent(/150\.000/)
  })

  it('shows a friendly notice when the quote request fails', async () => {
    const user = userEvent.setup()
    getQuote.mockRejectedValue(new Error('boom'))
    render(<Wizard />)

    await user.click(await screen.findByRole('button', { name: /Landing/i }))
    await user.click(screen.getByRole('button', { name: 'Siguiente' }))
    await user.click(await screen.findByRole('button', { name: /Pyme/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/no pudimos calcular/i)
    expect(screen.getByTestId('live-total')).toHaveTextContent('—')
  })
})

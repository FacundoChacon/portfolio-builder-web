import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import App from './App'

vi.mock('./api/client', () => ({
  getCatalog: vi.fn(),
}))

import { getCatalog } from './api/client'

const catalog = {
  project_types: [
    { id: 'landing', name: 'Landing', base_price: 180000, description: 'Una página' },
  ],
  entities: [{ id: 'pyme', name: 'Pyme', multiplier: 1.5 }],
  services: [{ id: 'seo', name: 'SEO', price: 45000, description: 'Posicionamiento' }],
  payment_methods: [{ id: 'transferencia', name: 'Transferencia' }],
  discounts: [
    { id: 'lanzamiento', name: 'Lanzamiento', percent: 10, description: 'Primeros clientes', code: 'lanzamiento' },
  ],
}

describe('App landing sections', () => {
  beforeEach(() => {
    getCatalog.mockReset()
  })

  it('renders hero, project types, services, payments and discounts from the backend catalog', async () => {
    getCatalog.mockResolvedValue(catalog)
    render(<App />)

    expect(
      await screen.findByRole('heading', { name: /tu página web, lista en minutos/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /armá tu presupuesto/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByText('Landing').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/180\.000/).length).toBeGreaterThan(0)
    expect(screen.getAllByText('SEO').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Transferencia').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Lanzamiento').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/10%/).length).toBeGreaterThan(0)
  })

  it('shows a catalog error notice without breaking non catalog sections', async () => {
    getCatalog.mockRejectedValue(new Error('boom'))
    render(<App />)

    expect(
      (await screen.findAllByText(/no pudimos cargar el catálogo/i)).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getByRole('heading', { name: /tu página web, lista en minutos/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /cómo funciona/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /proyectos recientes/i })).toBeInTheDocument()
  })

  it('keeps showing the wizard with its own loading state while the catalog loads', async () => {
    getCatalog.mockReturnValue(new Promise(() => {}))
    render(<App />)

    expect(await screen.findByRole('heading', { name: /tu página web, lista en minutos/i })).toBeInTheDocument()
  })
})
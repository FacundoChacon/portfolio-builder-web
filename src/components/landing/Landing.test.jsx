import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getCatalog } from '../../api/client'
import { portfolioProjects } from '../../data/portfolio'
import { Landing } from './Landing'

vi.mock('../../api/client', () => ({
  getCatalog: vi.fn(),
}))

const catalog = {
  project_types: [
    { id: 'landing', name: 'Landing', base_price: 180000, description: 'Una página' },
    { id: 'tienda', name: 'Tienda', base_price: 320000, description: 'Vendé online' },
  ],
  entities: [{ id: 'pyme', name: 'Pyme', multiplier: 1.5 }],
  services: [{ id: 'seo', name: 'SEO', price: 45000, description: 'Posicionamiento' }],
  payment_methods: [{ id: 'transferencia', name: 'Transferencia' }],
  discounts: [
    { id: 'lanzamiento', name: 'Lanzamiento', percent: 10, description: 'Primeros clientes', code: 'lanzamiento' },
  ],
}

describe('Landing', () => {
  beforeEach(() => {
    getCatalog.mockReset()
    getCatalog.mockResolvedValue(catalog)
    delete Element.prototype.scrollIntoView
  })

  it('scrolls to the wizard section when a "Armá tu presupuesto" CTA is clicked', async () => {
    const scrollSpy = vi.fn()
    Element.prototype.scrollIntoView = scrollSpy
    const user = userEvent.setup()

    render(<Landing />)
    await screen.findByRole('heading', { name: /tipos de proyecto/i })

    expect(document.getElementById('wizard')).toBeTruthy()
    await user.click(screen.getAllByRole('button', { name: /armá tu presupuesto/i })[0])

    expect(scrollSpy).toHaveBeenCalledTimes(1)
    expect(scrollSpy.mock.calls[0][0]).toEqual({ behavior: 'smooth', block: 'start' })
  })

  it('renders every showcase project from the portfolio data file', async () => {
    render(<Landing />)
    await screen.findByRole('heading', { name: /tipos de proyecto/i })

    expect(portfolioProjects.length).toBeGreaterThanOrEqual(3)
    expect(portfolioProjects.length).toBeLessThanOrEqual(6)
    for (const project of portfolioProjects) {
      expect(screen.getByText(project.titulo)).toBeInTheDocument()
    }
  })

  it('renders the showcase heading even while other sections depend on the catalog', async () => {
    render(<Landing />)
    await screen.findByRole('heading', { name: /proyectos recientes/i })
    expect(screen.getByRole('heading', { name: /cómo funciona/i })).toBeInTheDocument()
  })
})
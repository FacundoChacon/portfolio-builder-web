import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { testimonials } from '../../data/portfolio'
import { TestimonialsSection } from './TestimonialsSection'

describe('TestimonialsSection', () => {
  it('renders an accessible heading and every testimonial from the data file', () => {
    render(<TestimonialsSection />)

    expect(screen.getByRole('heading', { name: /lo que dicen nuestros clientes/i })).toBeInTheDocument()
    expect(testimonials.length).toBeGreaterThanOrEqual(3)
    expect(testimonials.length).toBeLessThanOrEqual(6)
    for (const testimonial of testimonials) {
      expect(screen.getByText(testimonial.nombre)).toBeInTheDocument()
      expect(screen.getByText(testimonial.rol)).toBeInTheDocument()
      expect(screen.getByText(testimonial.comentario)).toBeInTheDocument()
    }
  })

  it('renders one rating per testimonial', () => {
    render(<TestimonialsSection />)

    expect(screen.getAllByRole('img', { name: /valoración: \d de 5/i })).toHaveLength(testimonials.length)
  })

  it('renders nothing when the testimonials list is empty', async () => {
    vi.resetModules()
    vi.doMock('../../data/portfolio', () => ({ testimonials: [] }))
    const { TestimonialsSection: EmptyTestimonialsSection } = await import('./TestimonialsSection')

    const { container } = render(<EmptyTestimonialsSection />)
    expect(container).toBeEmptyDOMElement()
    vi.doUnmock('../../data/portfolio')
  })
})

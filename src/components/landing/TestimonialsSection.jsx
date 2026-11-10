import { testimonials } from '../../data/portfolio'

export function TestimonialsSection() {
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section id="testimonios" className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900">Lo que dicen nuestros clientes</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.nombre} className="rounded-xl border border-gray-200 bg-white p-4">
              <span
                role="img"
                aria-label={`Valoración: ${testimonial.rating} de 5`}
                className="text-amber-500"
              >
                {'★'.repeat(testimonial.rating)}
                <span className="text-gray-300">{'★'.repeat(5 - testimonial.rating)}</span>
              </span>
              <p className="mt-2 text-sm text-gray-600">{testimonial.comentario}</p>
              <p className="mt-4 text-sm font-semibold text-gray-900">{testimonial.nombre}</p>
              <p className="text-xs uppercase tracking-wide text-indigo-600">{testimonial.rol}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

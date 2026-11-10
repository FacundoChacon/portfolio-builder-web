import { testimonials } from '../../data/portfolio'

function hasValidRating(rating) {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5
}

export function TestimonialsSection() {
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section id="testimonios" className="scroll-mt-16 px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900">Lo que dicen nuestros clientes</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.nombre}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-4"
            >
              {hasValidRating(testimonial.rating) && (
                <span
                  role="img"
                  aria-label={`Calificación: ${testimonial.rating} de 5`}
                  className="text-sm leading-none text-amber-600"
                >
                  {'★'.repeat(testimonial.rating)}
                </span>
              )}
              <blockquote className="mt-2 text-sm text-gray-600">{testimonial.comentario}</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700"
                >
                  {testimonial.nombre.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold text-gray-900">{testimonial.nombre}</span>
                  <span className="block text-sm text-gray-600">{testimonial.rol}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

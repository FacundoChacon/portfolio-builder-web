import { formatPrice } from '../../lib/format'

export function ServicesSection({ catalog }) {
  return (
    <section id="servicios" className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900">Servicios</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.services.map((service) => (
            <div key={service.id} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                <span className="whitespace-nowrap font-medium text-indigo-700">
                  {formatPrice(service.price)}
                </span>
              </div>
              {service.description && (
                <p className="mt-1 text-sm text-gray-600">{service.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
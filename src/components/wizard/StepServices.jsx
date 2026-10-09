import { formatPrice } from '../../lib/format'

export function StepServices({ catalog, state, dispatch }) {
  return (
    <section aria-labelledby="step-services">
      <h2 id="step-services" className="text-lg font-semibold text-gray-900">
        ¿Querés sumar servicios?
      </h2>
      <p className="mt-1 text-sm text-gray-600">Es opcional, podés no elegir ninguno.</p>
      <div className="mt-4 space-y-2">
        {catalog.services.map((service) => {
          const checked = state.serviceIds.includes(service.id)
          return (
            <label
              key={service.id}
              className={`flex cursor-pointer items-start justify-between gap-4 rounded-xl border p-4 ${
                checked ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'
              }`}
            >
              <span className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600"
                  checked={checked}
                  onChange={() => dispatch({ type: 'TOGGLE_SERVICE', id: service.id })}
                />
                <span>
                  <span className="block font-semibold text-gray-900">{service.name}</span>
                  {service.description && (
                    <span className="mt-1 block text-sm text-gray-600">{service.description}</span>
                  )}
                </span>
              </span>
              <span className="whitespace-nowrap font-medium text-indigo-700">
                {formatPrice(service.price)}
              </span>
            </label>
          )
        })}
      </div>
    </section>
  )
}

export function EntitiesSection({ catalog }) {
  return (
    <section id="para-quien" className="bg-white px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900">¿Para quién?</h2>
        <p className="mt-1 text-sm text-gray-600">
          El multiplicador ajusta el presupuesto según tu escala.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {catalog.entities.map((entity) => (
            <div
              key={entity.id}
              className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
            >
              <span className="font-semibold text-gray-900">{entity.name}</span>
              <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                ×{entity.multiplier}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
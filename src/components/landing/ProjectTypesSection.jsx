import { formatPrice } from '../../lib/format'

export function ProjectTypesSection({ catalog }) {
  return (
    <section id="tipos" className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900">Tipos de proyecto y precios base</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {catalog.project_types.map((projectType) => (
            <div key={projectType.id} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold text-gray-900">{projectType.name}</h3>
                <span className="whitespace-nowrap font-medium text-indigo-700">
                  {formatPrice(projectType.base_price)}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{projectType.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
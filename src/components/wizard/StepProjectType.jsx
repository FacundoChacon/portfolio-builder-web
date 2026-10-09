import { formatPrice } from '../../lib/format'
import { OptionCard } from './OptionCard'

export function StepProjectType({ catalog, state, dispatch }) {
  return (
    <section aria-labelledby="step-project-type">
      <h2 id="step-project-type" className="text-lg font-semibold text-gray-900">
        ¿Qué tipo de proyecto necesitás?
      </h2>
      <p className="mt-1 text-sm text-gray-600">Elegí una opción para continuar.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {catalog.project_types.map((projectType) => (
          <OptionCard
            key={projectType.id}
            selected={state.projectTypeId === projectType.id}
            onClick={() => dispatch({ type: 'SELECT_PROJECT_TYPE', id: projectType.id })}
            title={projectType.name}
            description={projectType.description}
            meta={formatPrice(projectType.base_price)}
          />
        ))}
      </div>
    </section>
  )
}

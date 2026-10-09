import { OptionCard } from './OptionCard'

export function StepEntity({ catalog, state, dispatch }) {
  return (
    <section aria-labelledby="step-entity">
      <h2 id="step-entity" className="text-lg font-semibold text-gray-900">
        ¿Qué tipo de entidad sos?
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        El multiplicador ajusta el precio según tu escala.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {catalog.entities.map((entity) => (
          <OptionCard
            key={entity.id}
            selected={state.entityId === entity.id}
            onClick={() => dispatch({ type: 'SELECT_ENTITY', id: entity.id })}
            title={entity.name}
            meta={`×${entity.multiplier}`}
          />
        ))}
      </div>
    </section>
  )
}

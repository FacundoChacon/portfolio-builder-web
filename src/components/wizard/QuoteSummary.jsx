import { formatPrice } from '../../lib/format'

function findName(items, id) {
  const found = items?.find((item) => item.id === id)
  return found ? found.name : id
}

export function QuoteSummary({ catalog, state, quote }) {
  if (!quote) return null

  const serviceNames = (state.serviceIds ?? []).map((id) => findName(catalog.services, id))
  const projectName = findName(catalog.project_types, state.projectTypeId)
  const entityName = findName(catalog.entities, state.entityId)
  const entityMultiplier = quote.breakdown?.entity_multiplier
  const hasDiscount = quote.discount_amount > 0

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4" data-testid="quote-summary">
      <h3 className="text-base font-semibold text-gray-900">Resumen de tu presupuesto</h3>
      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-600">Proyecto</dt>
          <dd className="font-medium text-gray-900">{projectName}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Entidad</dt>
          <dd className="font-medium text-gray-900">
            {entityName}
            {entityMultiplier != null && ` (×${entityMultiplier})`}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Servicios</dt>
          <dd className="max-w-[60%] text-right font-medium text-gray-900">
            {serviceNames.length > 0 ? serviceNames.join(', ') : 'Ninguno'}
          </dd>
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-2">
          <dt className="text-gray-600">Subtotal</dt>
          <dd className="font-medium text-gray-900">{formatPrice(quote.subtotal)}</dd>
        </div>
        {hasDiscount && (
          <div className="flex justify-between text-emerald-700">
            <dt>Descuento ({quote.discount_percent}%)</dt>
            <dd>-{formatPrice(quote.discount_amount)}</dd>
          </div>
        )}
        <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-semibold text-gray-900">
          <dt>Total</dt>
          <dd data-testid="quote-total">{formatPrice(quote.total)}</dd>
        </div>
      </dl>
    </div>
  )
}

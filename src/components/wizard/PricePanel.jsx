import { formatPrice } from '../../lib/format'

export function PricePanel({ quote, loading, error, ready }) {
  const subtotal = quote ? formatPrice(quote.subtotal) : '—'
  const discount =
    quote && quote.discount_amount > 0
      ? `-${formatPrice(quote.discount_amount)} (${quote.discount_percent}%)`
      : '—'
  const total = quote ? formatPrice(quote.total) : '—'

  return (
    <aside className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4" aria-live="polite">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-800">
        Presupuesto en vivo
      </h3>
      {!ready && (
        <p className="mt-2 text-sm text-gray-600">
          Elegí tipo de proyecto y entidad para ver el precio.
        </p>
      )}
      {loading && <p className="mt-2 text-sm text-gray-600">Calculando…</p>}
      {error && (
        <p role="alert" className="mt-2 text-sm text-amber-800">
          {error}
        </p>
      )}
      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-600">Subtotal</dt>
          <dd className="font-medium text-gray-900" data-testid="live-subtotal">
            {subtotal}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Descuento</dt>
          <dd className="font-medium text-gray-900" data-testid="live-discount">
            {discount}
          </dd>
        </div>
        <div className="flex justify-between border-t border-indigo-100 pt-2 text-base font-semibold text-indigo-900">
          <dt>Total</dt>
          <dd data-testid="live-total">{total}</dd>
        </div>
      </dl>
    </aside>
  )
}

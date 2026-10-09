export function DiscountsSection({ catalog }) {
  return (
    <section id="descuentos" className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900">Descuentos especiales</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.discounts.map((discount) => (
            <div key={discount.id} className="rounded-xl border border-emerald-200 bg-white p-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-gray-900">{discount.name}</h3>
                <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-sm font-bold text-white">
                  {discount.percent}%
                </span>
              </div>
              {discount.description && (
                <p className="mt-1 text-sm text-gray-600">{discount.description}</p>
              )}
              <p className="mt-3 text-xs text-gray-500">
                Código: <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono">{discount.code}</code>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-gray-600">
          Ingresá el código en el paso 4 del presupuestador para ver el descuento aplicado en vivo.
        </p>
      </div>
    </section>
  )
}
export function PaymentSection({ catalog }) {
  return (
    <section id="pagos" className="bg-white px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900">Formas de pago</h2>
        <p className="mt-1 text-sm text-gray-600">Elegí la que más te convenga, es informativa.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {catalog.payment_methods.map((method) => (
            <span
              key={method.id}
              className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"
            >
              {method.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
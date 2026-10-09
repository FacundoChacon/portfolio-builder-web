const steps = [
  { number: 1, title: 'Elegí tu tipo de proyecto', text: 'Landing, tienda, blog, corporativa…' },
  { number: 2, title: 'Contanos qué entidad sos', text: 'Empresa, comercio, pyme, local.' },
  { number: 3, title: 'Sumá servicios opcionales', text: 'SEO, redacción, mantenimiento.' },
  { number: 4, title: 'Elegí pago y descuento', text: 'Definí cómo querés pagar y aplicá tu código.' },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900">Cómo funciona</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="rounded-xl border border-gray-200 p-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                {step.number}
              </span>
              <h3 className="mt-3 font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
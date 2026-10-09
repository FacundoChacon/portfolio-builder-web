import { scrollToId } from '../../lib/scroll'

export function Hero() {
  return (
    <section id="hero" className="px-4 py-20 text-center">
      <h1 className="mx-auto max-w-3xl text-4xl font-bold text-gray-900">
        Tu página web, lista en minutos
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
        Contanos qué tipo de proyecto necesitás y obtené un presupuesto al instante, sin llamadas
        ni mails de ida y vuelta.
      </p>
      <button
        type="button"
        onClick={() => scrollToId('wizard')}
        className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
      >
        Armá tu presupuesto
      </button>
    </section>
  )
}
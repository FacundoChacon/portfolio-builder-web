import { scrollToId } from '../../lib/scroll'

export function ContactSection() {
  return (
    <section id="contacto" className="px-4 py-16 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900">¿Listo para arrancar?</h2>
        <p className="mt-3 text-gray-600">
          Armá tu presupuesto en el wizard y te contactamos al toque. Escribinos también a{' '}
          <a href="mailto:hola@armatupagina.example" className="font-medium text-indigo-600 hover:underline">
            hola@armatupagina.example
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => scrollToId('wizard')}
          className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Armá tu presupuesto
        </button>
      </div>
    </section>
  )
}
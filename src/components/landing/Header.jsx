import { scrollToId } from '../../lib/scroll'

const navLinks = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#tipos', label: 'Tipos de proyecto' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <a href="#hero" className="font-bold text-gray-900">
          Arma tu página web
        </a>
        <nav className="hidden items-center gap-6 text-sm text-gray-600 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-indigo-600">
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => scrollToId('wizard')}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Armá tu presupuesto
        </button>
      </div>
    </header>
  )
}
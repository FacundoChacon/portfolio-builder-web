const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-gray-500 sm:flex-row">
        <p>© {currentYear} Arma tu página web</p>
        <nav className="flex gap-4">
          <a href="#tipos" className="hover:text-indigo-600">
            Tipos de proyecto
          </a>
          <a href="#servicios" className="hover:text-indigo-600">
            Servicios
          </a>
          <a href="#contacto" className="hover:text-indigo-600">
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  )
}
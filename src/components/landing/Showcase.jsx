import { portfolioProjects } from '../../data/portfolio'

export function Showcase() {
  return (
    <section id="proyectos" className="bg-white px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900">Proyectos recientes</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portfolioProjects.map((project) => (
            <article key={project.titulo} className="overflow-hidden rounded-xl border border-gray-200">
              <div className="h-28 bg-gradient-to-br from-indigo-500 via-indigo-400 to-sky-300" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{project.titulo}</h3>
                <p className="text-xs uppercase tracking-wide text-indigo-600">{project.tipo}</p>
                <p className="mt-2 text-sm text-gray-600">{project.descripcion}</p>
                {project.url && (
                  <a
                    href={project.url}
                    className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline"
                  >
                    Ver proyecto
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
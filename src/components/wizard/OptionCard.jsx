export function OptionCard({ selected, onClick, title, description, meta, control = 'button' }) {
  const base =
    'w-full rounded-xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
  const tone = selected
    ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500'
    : 'border-gray-200 bg-white hover:border-indigo-300'

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`${base} ${tone}`}
      data-control={control}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-900">{title}</p>
          {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
        </div>
        {meta && <span className="whitespace-nowrap font-medium text-indigo-700">{meta}</span>}
      </div>
    </button>
  )
}

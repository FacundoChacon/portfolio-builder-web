import { WIZARD_STEPS } from '../../state/wizardReducer'

export function ProgressIndicator({ step }) {
  const total = WIZARD_STEPS.length
  return (
    <div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Paso {step + 1}/{total}
        </span>
        <span className="font-medium text-gray-900">{WIZARD_STEPS[step].title}</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  )
}

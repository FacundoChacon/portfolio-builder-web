import { useMemo, useReducer } from 'react'
import { useCatalog } from '../../hooks/useCatalog'
import { useQuote } from '../../hooks/useQuote'
import {
  LAST_STEP,
  canGoNext,
  initialWizardState,
  wizardReducer,
} from '../../state/wizardReducer'
import { PricePanel } from './PricePanel'
import { ProgressIndicator } from './ProgressIndicator'
import { StepEntity } from './StepEntity'
import { StepPayment } from './StepPayment'
import { StepProjectType } from './StepProjectType'
import { StepServices } from './StepServices'

export function Wizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialWizardState)
  const { catalog, loading, error } = useCatalog()

  const ready = Boolean(state.projectTypeId && state.entityId)
  const quotePayload = useMemo(() => {
    if (!ready) return null
    return {
      project_type_id: state.projectTypeId,
      entity_id: state.entityId,
      service_ids: state.serviceIds,
      discount_code: state.discountCode,
    }
  }, [ready, state.projectTypeId, state.entityId, state.serviceIds, state.discountCode])

  const { quote, loading: quoteLoading, error: quoteError } = useQuote(quotePayload)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Armá tu presupuesto</h1>

      {loading && <p className="mt-6 text-sm text-gray-600">Cargando catálogo…</p>}

      {error && (
        <p role="alert" className="mt-6 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          {error}
        </p>
      )}

      {catalog && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_18rem]">
          <div>
            <ProgressIndicator step={state.step} />
            <div className="mt-6">
              {state.step === 0 && (
                <StepProjectType catalog={catalog} state={state} dispatch={dispatch} />
              )}
              {state.step === 1 && (
                <StepEntity catalog={catalog} state={state} dispatch={dispatch} />
              )}
              {state.step === 2 && (
                <StepServices catalog={catalog} state={state} dispatch={dispatch} />
              )}
              {state.step === 3 && (
                <StepPayment
                  catalog={catalog}
                  state={state}
                  dispatch={dispatch}
                  quote={quote}
                  quoteError={quoteError}
                />
              )}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => dispatch({ type: 'BACK' })}
                disabled={state.step === 0}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Atrás
              </button>
              {state.step < LAST_STEP && (
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'NEXT' })}
                  disabled={!canGoNext(state)}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Siguiente
                </button>
              )}
            </div>
          </div>

          <PricePanel quote={quote} loading={quoteLoading} error={quoteError} ready={ready} />
        </div>
      )}
    </div>
  )
}

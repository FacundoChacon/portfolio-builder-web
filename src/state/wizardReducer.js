export const WIZARD_STEPS = [
  { id: 'projectType', title: 'Tipo de proyecto' },
  { id: 'entity', title: 'Entidad' },
  { id: 'services', title: 'Servicios' },
  { id: 'payment', title: 'Pago y descuento' },
]

export const LAST_STEP = WIZARD_STEPS.length - 1

export const initialWizardState = {
  step: 0,
  projectTypeId: null,
  entityId: null,
  serviceIds: [],
  paymentMethodId: null,
  discountCode: null,
}

export function canGoNext(state) {
  if (state.step >= LAST_STEP) return false
  if (state.step === 0) return state.projectTypeId != null
  if (state.step === 1) return state.entityId != null
  return true
}

export function wizardReducer(state, action) {
  switch (action.type) {
    case 'SELECT_PROJECT_TYPE':
      return { ...state, projectTypeId: action.id }
    case 'SELECT_ENTITY':
      return { ...state, entityId: action.id }
    case 'TOGGLE_SERVICE': {
      const exists = state.serviceIds.includes(action.id)
      const serviceIds = exists
        ? state.serviceIds.filter((id) => id !== action.id)
        : [...state.serviceIds, action.id]
      return { ...state, serviceIds }
    }
    case 'SELECT_PAYMENT_METHOD':
      return { ...state, paymentMethodId: action.id }
    case 'SELECT_DISCOUNT':
      return { ...state, discountCode: action.code ?? null }
    case 'NEXT':
      return canGoNext(state) ? { ...state, step: state.step + 1 } : state
    case 'BACK':
      return state.step > 0 ? { ...state, step: state.step - 1 } : state
    default:
      return state
  }
}

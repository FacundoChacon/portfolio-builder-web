import { describe, expect, it } from 'vitest'
import {
  WIZARD_STEPS,
  canGoNext,
  initialWizardState,
  wizardReducer,
} from './wizardReducer'

describe('wizardReducer', () => {
  it('starts on the first step with an empty selection', () => {
    expect(initialWizardState.step).toBe(0)
    expect(initialWizardState.projectTypeId).toBeNull()
    expect(initialWizardState.entityId).toBeNull()
    expect(initialWizardState.serviceIds).toEqual([])
  })

  it('blocks advancing from step 1 without a project type', () => {
    expect(canGoNext(initialWizardState)).toBe(false)
    const next = wizardReducer(initialWizardState, { type: 'NEXT' })
    expect(next.step).toBe(0)
  })

  it('advances after selecting a project type', () => {
    const selected = wizardReducer(initialWizardState, {
      type: 'SELECT_PROJECT_TYPE',
      id: 'landing',
    })
    expect(canGoNext(selected)).toBe(true)
    expect(wizardReducer(selected, { type: 'NEXT' }).step).toBe(1)
  })

  it('blocks advancing from step 2 without an entity', () => {
    const state = { ...initialWizardState, step: 1, projectTypeId: 'landing' }
    expect(canGoNext(state)).toBe(false)
    expect(wizardReducer(state, { type: 'NEXT' }).step).toBe(1)
  })

  it('goes back preserving previous selections', () => {
    const state = {
      ...initialWizardState,
      step: 1,
      projectTypeId: 'landing',
      entityId: 'pyme',
    }
    const back = wizardReducer(state, { type: 'BACK' })
    expect(back.step).toBe(0)
    expect(back.projectTypeId).toBe('landing')
    expect(back.entityId).toBe('pyme')
  })

  it('does not go back before the first step', () => {
    expect(wizardReducer(initialWizardState, { type: 'BACK' }).step).toBe(0)
  })

  it('allows advancing from services with zero selected', () => {
    const state = { ...initialWizardState, step: 2, projectTypeId: 'x', entityId: 'y' }
    expect(canGoNext(state)).toBe(true)
    expect(wizardReducer(state, { type: 'NEXT' }).step).toBe(3)
  })

  it('adds a service then removes it when toggled twice', () => {
    const added = wizardReducer(initialWizardState, {
      type: 'TOGGLE_SERVICE',
      id: 'seo',
    })
    expect(added.serviceIds).toEqual(['seo'])
    const removed = wizardReducer(added, { type: 'TOGGLE_SERVICE', id: 'seo' })
    expect(removed.serviceIds).toEqual([])
  })

  it('accumulates multiple services keeping insertion order', () => {
    let state = wizardReducer(initialWizardState, { type: 'TOGGLE_SERVICE', id: 'seo' })
    state = wizardReducer(state, { type: 'TOGGLE_SERVICE', id: 'diseno' })
    expect(state.serviceIds).toEqual(['seo', 'diseno'])
  })

  it('sets and clears the discount code', () => {
    const withCode = wizardReducer(initialWizardState, {
      type: 'SELECT_DISCOUNT',
      code: 'lanzamiento',
    })
    expect(withCode.discountCode).toBe('lanzamiento')
    const cleared = wizardReducer(withCode, { type: 'SELECT_DISCOUNT', code: null })
    expect(cleared.discountCode).toBeNull()
  })

  it('exposes four wizard steps', () => {
    expect(WIZARD_STEPS).toHaveLength(4)
  })
})

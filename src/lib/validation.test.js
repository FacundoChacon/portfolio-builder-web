import { describe, expect, it } from 'vitest'
import { validateContact } from './validation'

describe('validateContact', () => {
  it('accepts a well formed contact', () => {
    const result = validateContact({ name: 'Ana García', email: 'ana@example.com', phone: '11 5555-1234' })
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('accepts an unspecified phone', () => {
    expect(validateContact({ name: 'Ana', email: 'ana@example.com', phone: null }).valid).toBe(true)
    expect(validateContact({ name: 'Ana', email: 'ana@example.com', phone: '' }).valid).toBe(true)
  })

  it('rejects a name that is too short', () => {
    expect(validateContact({ name: 'A', email: 'ana@example.com', phone: null }).valid).toBe(false)
    expect(validateContact({ name: '', email: 'ana@example.com', phone: null })).toHaveProperty('errors.name')
  })

  it('rejects a name longer than 80 characters', () => {
    const result = validateContact({ name: 'x'.repeat(81), email: 'ana@example.com', phone: null })
    expect(result.valid).toBe(false)
    expect(result.errors.name).toBeTruthy()
  })

  it('accepts a name of exactly 80 characters', () => {
    expect(validateContact({ name: 'x'.repeat(80), email: 'ana@example.com', phone: null }).valid).toBe(true)
  })

  it('accepts a valid email', () => {
    const result = validateContact({ name: 'Ana', email: 'ana.garcia+tag@sub.example.com', phone: null })
    expect(result.errors.email).toBeUndefined()
    expect(result.valid).toBe(true)
  })

  it('rejects an email without a domain or an at sign', () => {
    const noAt = validateContact({ name: 'Ana', email: 'anagarcia', phone: null })
    const noDomain = validateContact({ name: 'Ana', email: 'ana@', phone: null })
    expect(noAt.valid).toBe(false)
    expect(noAt.errors.email).toBeTruthy()
    expect(noDomain.errors.email).toBeTruthy()
  })

  it('accepts a phone up to 30 characters', () => {
    expect(validateContact({ name: 'Ana', email: 'ana@example.com', phone: 'p'.repeat(30) }).valid).toBe(true)
  })

  it('rejects a phone longer than 30 characters', () => {
    const result = validateContact({ name: 'Ana', email: 'ana@example.com', phone: 'p'.repeat(31) })
    expect(result.valid).toBe(false)
    expect(result.phone).toBeUndefined()
    expect(result.errors.phone).toBeTruthy()
  })
})
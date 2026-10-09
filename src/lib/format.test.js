import { describe, expect, it } from 'vitest'
import { formatPrice } from './format'

describe('formatPrice', () => {
  it('formats a whole amount with currency grouping', () => {
    const out = formatPrice(1000)
    expect(out).toContain('$')
    expect(out).toMatch(/1\.000/)
  })

  it('formats larger amounts grouping thousands', () => {
    expect(formatPrice(1234567)).toMatch(/1\.234\.567/)
  })

  it('does not show decimals for integer pesos', () => {
    expect(formatPrice(1000)).not.toMatch(/,00/)
  })

  it('formats zero', () => {
    expect(formatPrice(0)).toMatch(/0/)
  })

  it('returns an em dash placeholder for missing values', () => {
    expect(formatPrice(null)).toBe('—')
    expect(formatPrice(undefined)).toBe('—')
  })

  it('returns an em dash placeholder for non numeric values', () => {
    expect(formatPrice(NaN)).toBe('—')
    expect(formatPrice('abc')).toBe('—')
  })
})

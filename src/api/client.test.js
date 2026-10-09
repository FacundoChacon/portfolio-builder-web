import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiError, getCatalog, getQuote } from './client'

describe('api client', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('GETs the catalog from the configured base url', async () => {
    const payload = { project_types: [], entities: [], services: [] }
    fetch.mockResolvedValue({ ok: true, json: async () => payload })

    const result = await getCatalog()

    expect(result).toEqual(payload)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch.mock.calls[0][0]).toBe('http://localhost:8000/catalog')
  })

  it('POSTs the quote payload as JSON and returns the parsed body', async () => {
    const response = { total: 1000, subtotal: 1200, discount_amount: 200 }
    fetch.mockResolvedValue({ ok: true, json: async () => response })

    const payload = {
      project_type_id: 'landing',
      entity_id: 'pyme',
      service_ids: ['seo'],
      discount_code: null,
    }
    const result = await getQuote(payload)

    expect(result).toEqual(response)
    const [url, options] = fetch.mock.calls[0]
    expect(url).toBe('http://localhost:8000/quote')
    expect(options.method).toBe('POST')
    expect(options.headers['Content-Type']).toBe('application/json')
    expect(JSON.parse(options.body)).toEqual(payload)
  })

  it('throws an ApiError carrying the 422 status on invalid discount', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 422,
      json: async () => ({ detail: 'invalid discount_code' }),
    })

    await expect(
      getQuote({
        project_type_id: 'landing',
        entity_id: 'pyme',
        service_ids: [],
        discount_code: 'nope',
      }),
    ).rejects.toMatchObject({ name: 'ApiError', status: 422 })
  })

  it('throws an ApiError carrying the 404 status on unknown reference', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ detail: 'unknown project_type' }),
    })

    await expect(
      getQuote({
        project_type_id: 'ghost',
        entity_id: 'pyme',
        service_ids: [],
        discount_code: null,
      }),
    ).rejects.toBeInstanceOf(ApiError)
  })
})

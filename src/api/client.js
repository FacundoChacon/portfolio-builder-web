const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function extractMessage(response) {
  try {
    const body = await response.json()
    if (body && typeof body.detail === 'string') return body.detail
    if (body && typeof body.message === 'string') return body.message
  } catch {
    // response had no JSON body
  }
  return `Request failed with status ${response.status}`
}

async function request(path, options) {
  const response = await fetch(`${BASE_URL}${path}`, options)
  if (!response.ok) {
    const message = await extractMessage(response)
    throw new ApiError(message, response.status)
  }
  return response.json()
}

export function getCatalog() {
  return request('/catalog')
}

export function getQuote(payload) {
  return request('/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export function createLead(payload) {
  return request('/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

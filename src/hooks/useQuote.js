import { useEffect, useState } from 'react'
import { getQuote } from '../api/client'

const EMPTY = { quote: null, loading: false, error: null }

export function useQuote(payload) {
  const key = payload ? JSON.stringify(payload) : null
  const [result, setResult] = useState({ key: null, quote: null, error: null })

  useEffect(() => {
    if (!key) return
    let active = true
    getQuote(JSON.parse(key))
      .then((data) => {
        if (active) setResult({ key, quote: data, error: null })
      })
      .catch(() => {
        if (active) {
          setResult({
            key,
            quote: null,
            error: 'No pudimos calcular el presupuesto en este momento. Intentá de nuevo.',
          })
        }
      })
    return () => {
      active = false
    }
  }, [key])

  if (!key) return EMPTY
  if (result.key !== key) return { quote: null, loading: true, error: null }
  return { quote: result.quote, loading: false, error: result.error }
}

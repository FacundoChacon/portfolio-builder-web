import { useEffect, useState } from 'react'
import { getCatalog } from '../api/client'

export function useCatalog() {
  const [catalog, setCatalog] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getCatalog()
      .then((data) => {
        if (!active) return
        setCatalog(data)
        setError(null)
      })
      .catch(() => {
        if (!active) return
        setError('No pudimos cargar el catálogo. Revisá tu conexión e intentá de nuevo.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return { catalog, loading, error }
}

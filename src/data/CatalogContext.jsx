import { useEffect, useState } from 'react'
import { apiRequest, normalizeProduct } from './api.js'
import { CatalogContext } from './catalogContext.js'

export function CatalogProvider({ children }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [reloadKey, setReloadKey] = useState(0)

    useEffect(() => {
        let active = true

        apiRequest('/products')
            .then((result) => {
                if (active) setProducts((result.data || []).map(normalizeProduct))
            })
            .catch((requestError) => {
                if (active) setError(requestError.message)
            })
            .finally(() => {
                if (active) setLoading(false)
            })

        return () => { active = false }
    }, [reloadKey])

    const retry = () => {
        setError('')
        setLoading(true)
        setReloadKey((key) => key + 1)
    }

    return (
        <CatalogContext.Provider value={{ products, loading, error, retry }}>
            {children}
        </CatalogContext.Provider>
    )
}

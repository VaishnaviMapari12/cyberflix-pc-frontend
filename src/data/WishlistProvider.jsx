import { useCallback, useMemo, useState } from 'react'
import { WishlistContext } from './wishlistContext.js'

const STORAGE_KEY = 'cyberflixWishlist'

const readWishlist = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        return Array.isArray(saved) ? saved : []
    } catch (error) {
        console.error('Wishlist data error:', error)
        return []
    }
}

export default function WishlistProvider({ children }) {
    const [items, setItems] = useState(readWishlist)

    const updateItems = useCallback((nextItems) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems))
        setItems(nextItems)
    }, [])

    const isSaved = useCallback(
        (productId) => items.some((item) => String(item.id) === String(productId)),
        [items]
    )

    const toggle = useCallback((product) => {
        const saved = items.some((item) => String(item.id) === String(product.id))
        const nextItems = saved
            ? items.filter((item) => String(item.id) !== String(product.id))
            : [...items, product]
        updateItems(nextItems)
    }, [items, updateItems])

    const remove = useCallback((productId) => {
        updateItems(items.filter((item) => String(item.id) !== String(productId)))
    }, [items, updateItems])

    const value = useMemo(
        () => ({ items, count: items.length, isSaved, toggle, remove }),
        [items, isSaved, toggle, remove]
    )

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}




import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest } from './api.js'
import { CartContext } from './cartContext.js'
import { getUserId } from './getUserId.js'

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // =========================
    // LOAD CART
    // =========================
    const loadCart = useCallback(async () => {
        try {
            setLoading(true)
            setError('')

            const userId = getUserId()

            // User login nasel tar cart empty
            if (!userId) {
                setCart([])
                return
            }

            const result = await apiRequest(`/cart/${userId}`)

            setCart(result.data || [])

        } catch (err) {
            console.error('Cart load error:', err)

            setError(
                err.message || 'Unable to load cart'
            )
        } finally {
            setLoading(false)
        }
    }, [])

    // Load cart when app starts
    useEffect(() => {
        const request = window.setTimeout(() => { void loadCart() }, 0)
        return () => window.clearTimeout(request)
    }, [loadCart])

    // =========================
    // ADD TO CART
    // =========================
    const add = async (productId, quantity = 1) => {
        try {
            setError('')

            const userId = getUserId()

            if (!userId) {
                throw new Error(
                    'Please log in to add products to your cart'
                )
            }

            const result = await apiRequest('/cart/add', {
                method: 'POST',
                body: JSON.stringify({
                    userId,
                    productId: Number(productId),
                    quantity: Number(quantity)
                })
            })

            await loadCart()
            return result
        } catch (err) {
            console.error('Add cart error:', err)
            setError(err.message || 'Unable to add product')
            throw err
        }
    }

    const updateQuantity = async (cartId, quantity) => {
        try {
            setError('')

            if (Number(quantity) < 1) {
                return remove(cartId)
            }

            const result = await apiRequest(`/cart/${cartId}`, {
                method: 'PUT',
                body: JSON.stringify({ quantity: Number(quantity) })
            })

            await loadCart()
            return result
        } catch (err) {
            console.error('Update cart error:', err)
            setError(err.message || 'Unable to update quantity')
            throw err
        }
    }

    const remove = async (cartId) => {
        try {
            setError('')

            const result = await apiRequest(`/cart/${cartId}`, {
                method: 'DELETE'
            })

            await loadCart()
            return result
        } catch (err) {
            console.error('Remove cart error:', err)
            setError(err.message || 'Unable to remove item')
            throw err
        }
    }

    const reset = () => setCart([])

    const clear = async () => {
        try {
            setError('')
            const userId = getUserId()

            if (!userId) {
                setCart([])
                return
            }

            const result = await apiRequest(`/cart/clear/${userId}`, {
                method: 'DELETE'
            })

            setCart([])
            return result
        } catch (err) {
            console.error('Clear cart error:', err)
            setError(err.message || 'Unable to clear cart')
            throw err
        }
    }

    const total = useMemo(() => cart.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
        0
    ), [cart])

    const itemCount = useMemo(() => cart.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
    ), [cart])

    const value = {
        cart,
        loading,
        error,
        total,
        itemCount,
        add,
        updateQuantity,
        remove,
        clear,
        reset,
        loadCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

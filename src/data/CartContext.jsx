// import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// const CartContext = createContext(null)

// const API_URL = 'http://localhost:5000/api'
// const USER_ID = 1

// export function CartProvider({ children }) {
//     const [cart, setCart] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState('')

//     const loadCart = async () => {
//         try {
//             setLoading(true)
//             setError('')

//             const response = await fetch(`${API_URL}/cart/${USER_ID}`)
//             const result = await response.json()

//             if (!response.ok || !result.success) {
//                 throw new Error(result.message || 'Failed to load cart')
//             }

//             setCart(result.data || [])
//         } catch (err) {
//             console.error('Cart load error:', err)
//             setError(err.message || 'Unable to load cart')
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         loadCart()
//     }, [])

//     const add = async (productId, quantity = 1) => {
//         try {
//             setError('')

//             const response = await fetch(`${API_URL}/cart/add`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     userId: USER_ID,
//                     productId: Number(productId),
//                     quantity: Number(quantity)
//                 })
//             })

//             const result = await response.json()

//             if (!response.ok || !result.success) {
//                 throw new Error(result.message || 'Failed to add product')
//             }

//             await loadCart()

//             return result
//         } catch (err) {
//             console.error('Add cart error:', err)
//             setError(err.message || 'Unable to add product')
//             throw err
//         }
//     }

//     const updateQuantity = async (cartId, quantity) => {
//         try {
//             setError('')

//             if (Number(quantity) < 1) {
//                 return remove(cartId)
//             }

//             const response = await fetch(`${API_URL}/cart/${cartId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     quantity: Number(quantity)
//                 })
//             })

//             const result = await response.json()

//             if (!response.ok || !result.success) {
//                 throw new Error(result.message || 'Failed to update quantity')
//             }

//             await loadCart()

//             return result
//         } catch (err) {
//             console.error('Update cart error:', err)
//             setError(err.message || 'Unable to update quantity')
//             throw err
//         }
//     }

//     const remove = async (cartId) => {
//         try {
//             setError('')

//             const response = await fetch(`${API_URL}/cart/${cartId}`, {
//                 method: 'DELETE'
//             })

//             const result = await response.json()

//             if (!response.ok || !result.success) {
//                 throw new Error(result.message || 'Failed to remove item')
//             }

//             await loadCart()

//             return result
//         } catch (err) {
//             console.error('Remove cart error:', err)
//             setError(err.message || 'Unable to remove item')
//             throw err
//         }
//     }

//     const clear = async () => {
//         try {
//             setError('')

//             const response = await fetch(
//                 `${API_URL}/cart/clear/${USER_ID}`,
//                 {
//                     method: 'DELETE'
//                 }
//             )

//             const result = await response.json()

//             if (!response.ok || !result.success) {
//                 throw new Error(result.message || 'Failed to clear cart')
//             }

//             setCart([])

//             return result
//         } catch (err) {
//             console.error('Clear cart error:', err)
//             setError(err.message || 'Unable to clear cart')
//             throw err
//         }
//     }

//     const total = useMemo(() => {
//         return cart.reduce(
//             (sum, item) =>
//                 sum + Number(item.price || 0) * Number(item.quantity || 0),
//             0
//         )
//     }, [cart])

//     const itemCount = useMemo(() => {
//         return cart.reduce(
//             (sum, item) => sum + Number(item.quantity || 0),
//             0
//         )
//     }, [cart])

//     const value = {
//         cart,
//         loading,
//         error,
//         total,
//         itemCount,
//         add,
//         updateQuantity,
//         remove,
//         clear,
//         loadCart
//     }

//     return (
//         <CartContext.Provider value={value}>
//             {children}
//         </CartContext.Provider>
//     )
// }

// export function useCart() {
//     const context = useContext(CartContext)

//     if (!context) {
//         throw new Error('useCart must be used inside CartProvider')
//     }

//     return context
// }


import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { apiRequest } from './api.js'

const CartContext = createContext(null)

// Get currently logged-in user
export const getUserId = () => {
    const savedUser =
        localStorage.getItem('cyberflixUser') ||
        sessionStorage.getItem('cyberflixUser')

    if (!savedUser) {
        return null
    }

    try {
        const user = JSON.parse(savedUser)
        return user?.id || null
    } catch (error) {
        console.error('User data error:', error)
        return null
    }
}

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
        loadCart()
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
        loadCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCart must be used inside CartProvider')
    }

    return context
}

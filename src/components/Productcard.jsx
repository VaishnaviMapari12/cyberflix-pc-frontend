// import { Link } from 'react-router-dom'
// import { useState } from 'react'
// import ProductImage from './ProductImage.jsx'
// import { useCart } from '../data/CartContext.jsx'
// import { categories, usd } from '../data/products.js'

// export default function ProductCard({ p }) {
//     const { add } = useCart()
//     const [adding, setAdding] = useState(false)
//     const [error, setError] = useState('')
//     const cat = categories.find((c) => c.id === p.cat) || categories[categories.length - 1]

//     const addToBag = async () => {
//         setAdding(true)
//         setError('')

//         try {
//             await add(p.id)
//         } catch (addError) {
//             setError(addError.message || 'Unable to add product')
//         } finally {
//             setAdding(false)
//         }
//     }

//     return (
//         <article className="card">
//             <Link to={`/product/${p.id}`} className="ph">
//                 <ProductImage p={p} />
//                 {p.badge && <em className="badge">{p.badge}</em>}
//             </Link>
//             <div className="body">
//                 <div className="meta">
//                     <small>{cat.label}</small>
//                     <span className="rate">★ {p.rating} <small>({Number(p.reviews || 0).toLocaleString('en-US')})</small></span>
//                 </div>
//                 <Link to={`/product/${p.id}`}><h3>{p.name}</h3></Link>
//                 <div className="tags">{String(p.spec || 'PC component').split(' · ').map((s) => <span key={s}>{s}</span>)}</div>
//                 <div className="foot">
//                     <b>{usd(p.price)}+</b>
//                     <div className="acts">
//                         <Link className="btn ghost sm" to={`/product/${p.id}`}>View details</Link>
//                         <button className="btn sm" onClick={addToBag} disabled={adding}>
//                             {adding ? 'Adding...' : 'Add to bag'}
//                         </button>
//                     </div>
//                     {error && <small role="alert">{error}</small>}
//                 </div>
//             </div>
//         </article>
//     )
// }




import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'
import { Link } from 'react-router-dom'
import ProductImage from './ProductImage.jsx'
import { useCart as useCartStore } from '../data/CartContext.jsx'
import { API_BASE } from '../data/api.js'
import { categories, usd } from '../data/products.js'

const CartContext = createContext(null)

const API_URL = API_BASE

// Temporary user ID for testing
// Later this will come from Login/Auth
const USER_ID = 1

export function CartProvider({ children }) {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // ======================================
    // GET CART
    // ======================================

    const loadCart = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await fetch(
                `${API_URL}/cart/${USER_ID}`
            )

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    'Failed to load cart'
                )
            }

            setItems(result.data || [])

        } catch (err) {
            console.error(
                'Load cart error:',
                err
            )

            setError(
                err.message ||
                'Unable to load cart'
            )

        } finally {
            setLoading(false)
        }
    }

    // ======================================
    // ADD TO CART
    // ======================================

    const add = async (
        productId,
        quantity = 1
    ) => {
        try {
            setError('')

            const response = await fetch(
                `${API_URL}/cart/add`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        userId: USER_ID,
                        productId: productId,
                        quantity: quantity
                    })
                }
            )

            const result =
                await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    'Failed to add product to cart'
                )
            }

            // Refresh cart after adding
            await loadCart()

            return result

        } catch (err) {
            console.error(
                'Add cart error:',
                err
            )

            setError(
                err.message ||
                'Unable to add product'
            )

            throw err
        }
    }

    // ======================================
    // UPDATE QUANTITY
    // ======================================

    const updateQuantity = async (
        cartId,
        quantity
    ) => {
        try {
            setError('')

            const response = await fetch(
                `${API_URL}/cart/${cartId}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        quantity: quantity
                    })
                }
            )

            const result =
                await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    'Failed to update cart'
                )
            }

            await loadCart()

            return result

        } catch (err) {
            console.error(
                'Update cart error:',
                err
            )

            setError(
                err.message ||
                'Unable to update cart'
            )

            throw err
        }
    }

    // ======================================
    // REMOVE FROM CART
    // ======================================

    const remove = async (cartId) => {
        try {
            setError('')

            const response = await fetch(
                `${API_URL}/cart/${cartId}`,
                {
                    method: 'DELETE'
                }
            )

            const result =
                await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    'Failed to remove product'
                )
            }

            await loadCart()

            return result

        } catch (err) {
            console.error(
                'Remove cart error:',
                err
            )

            setError(
                err.message ||
                'Unable to remove product'
            )

            throw err
        }
    }

    // ======================================
    // CLEAR CART
    // ======================================

    const clearCart = async () => {
        try {
            await loadCart()
        } catch (err) {
            console.error(
                'Clear cart error:',
                err
            )
        }
    }

    // ======================================
    // INITIAL CART LOAD
    // ======================================

    useEffect(() => {
        loadCart()
    }, [])

    // ======================================
    // TOTAL
    // ======================================

    const total = items.reduce(
        (sum, item) =>
            sum +
            Number(item.price || 0) *
            Number(item.quantity || 0),
        0
    )

    // ======================================
    // ITEM COUNT
    // ======================================

    const count = items.reduce(
        (sum, item) =>
            sum +
            Number(item.quantity || 0),
        0
    )

    return (
        <CartContext.Provider
            value={{
                items,
                loading,
                error,
                add,
                updateQuantity,
                remove,
                clearCart,
                loadCart,
                total,
                count
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context =
        useContext(CartContext)

    if (!context) {
        throw new Error(
            'useCart must be used inside CartProvider'
        )
    }

    return context
}

export default function ProductCard({ p }) {
    const { add } = useCartStore()
    const [adding, setAdding] = useState(false)
    const [error, setError] = useState('')
    const category = categories.find((item) => item.id === p.cat) || categories[categories.length - 1]

    const addToBag = async () => {
        setAdding(true)
        setError('')

        try {
            await add(p.id)
        } catch (addError) {
            setError(addError.message || 'Unable to add product')
        } finally {
            setAdding(false)
        }
    }

    return (
        <article className="card">
            <Link to={`/product/${p.id}`} className="ph">
                <ProductImage p={p} />
                {p.badge && <em className="badge">{p.badge}</em>}
            </Link>
            <div className="body">
                <div className="meta">
                    <small>{category.label}</small>
                    <span className="rate">★ {p.rating} <small>({Number(p.reviews || 0).toLocaleString('en-US')})</small></span>
                </div>
                <Link to={`/product/${p.id}`}><h3>{p.name}</h3></Link>
                <div className="tags">{String(p.spec || 'PC component').split(' · ').map((spec) => <span key={spec}>{spec}</span>)}</div>
                <div className="foot">
                    <b>{usd(Number(p.price) || 0)}+</b>
                    <div className="acts">
                        <Link className="btn ghost sm" to={`/product/${p.id}`}>View details</Link>
                        <button className="btn sm" onClick={addToBag} disabled={adding}>
                            {adding ? 'Adding...' : 'Add to bag'}
                        </button>
                    </div>
                    {error && <small role="alert">{error}</small>}
                </div>
            </div>
        </article>
    )
}


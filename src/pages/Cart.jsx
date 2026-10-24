// import { Link } from 'react-router-dom'
// import { useCart } from '../data/CartContext.jsx'

// const formatPrice = (price) => {
//     return `₹${Number(price || 0).toLocaleString('en-IN')}`
// }

// export default function Cart() {
//     const {
//         cart,
//         loading,
//         error,
//         total,
//         updateQuantity,
//         remove,
//         clear
//     } = useCart()

//     if (loading) {
//         return (
//             <section className="sec">
//                 <p className="mute">Loading your cart...</p>
//             </section>
//         )
//     }

//     return (
//         <section className="sec">

//             <div className="sh">
//                 <div>
//                     <p className="kicker">CYBERFLIX</p>
//                     <h1>Your Bag</h1>
//                 </div>

//                 {cart.length > 0 && (
//                     <button
//                         className="btn ghost"
//                         onClick={clear}
//                     >
//                         Clear Bag
//                     </button>
//                 )}
//             </div>

//             {error && (
//                 <div className="catalog-error">
//                     <p>{error}</p>
//                 </div>
//             )}

//             {cart.length === 0 ? (
//                 <div className="empty-state">
//                     <p className="kicker">YOUR BAG IS EMPTY</p>

//                     <h2>No components added yet.</h2>

//                     <p className="lead">
//                         Explore our PC components and start building your setup.
//                     </p>

//                     <Link
//                         to="/products"
//                         className="btn"
//                     >
//                         Browse Components
//                     </Link>
//                 </div>
//             ) : (

//                 <div className="cart-layout">

//                     <div className="cart-items">

//                         {cart.map((item) => (

//                             <article
//                                 className="cart-item"
//                                 key={item.cart_id}
//                             >

//                                 {/* Image placeholder */}
//                                 <div className="cart-image">
//                                     <div className="cart-image-placeholder">
//                                         PC
//                                     </div>
//                                 </div>

//                                 <div className="cart-info">

//                                     <p className="kicker">
//                                         {item.category || 'PC COMPONENT'}
//                                     </p>

//                                     <h3>{item.name}</h3>

//                                     {item.brand && (
//                                         <p className="mute">
//                                             {item.brand}
//                                         </p>
//                                     )}

//                                     <p className="price">
//                                         {formatPrice(item.price)}
//                                     </p>

//                                     <div className="cart-actions">

//                                         <div className="quantity">

//                                             <button
//                                                 className="qty-btn"
//                                                 onClick={() =>
//                                                     updateQuantity(
//                                                         item.cart_id,
//                                                         Number(item.quantity) - 1
//                                                     )
//                                                 }
//                                             >
//                                                 −
//                                             </button>

//                                             <span>
//                                                 {item.quantity}
//                                             </span>

//                                             <button
//                                                 className="qty-btn"
//                                                 onClick={() =>
//                                                     updateQuantity(
//                                                         item.cart_id,
//                                                         Number(item.quantity) + 1
//                                                     )
//                                                 }
//                                             >
//                                                 +
//                                             </button>

//                                         </div>

//                                         <button
//                                             className="link"
//                                             onClick={() =>
//                                                 remove(item.cart_id)
//                                             }
//                                         >
//                                             Remove
//                                         </button>

//                                     </div>

//                                 </div>

//                                 <div className="cart-item-total">
//                                     {formatPrice(
//                                         Number(item.price) *
//                                         Number(item.quantity)
//                                     )}
//                                 </div>

//                             </article>

//                         ))}

//                     </div>

//                     <aside className="cart-summary">

//                         <p className="kicker">
//                             ORDER SUMMARY
//                         </p>

//                         <h2>Build Total</h2>

//                         <div className="summary-row">
//                             <span>Items</span>
//                             <span>{cart.length}</span>
//                         </div>

//                         <div className="summary-row">
//                             <span>Quantity</span>
//                             <span>
//                                 {cart.reduce(
//                                     (sum, item) =>
//                                         sum + Number(item.quantity),
//                                     0
//                                 )}
//                             </span>
//                         </div>

//                         <div className="summary-row total-row">
//                             <strong>Total</strong>

//                             <strong>
//                                 {formatPrice(total)}
//                             </strong>
//                         </div>

//                         <button
//                             className="btn checkout-btn"
//                             onClick={() =>
//                                 alert(
//                                     'Checkout functionality will be added next.'
//                                 )
//                             }
//                         >
//                             Proceed to Checkout
//                         </button>

//                         <Link
//                             to="/products"
//                             className="btn ghost continue-btn"
//                         >
//                             Continue Shopping
//                         </Link>

//                     </aside>

//                 </div>

//             )}

//         </section>
//     )
// }


import { Link, useNavigate } from 'react-router-dom'
import { getUserId } from '../data/getUserId.js'
import { useCart } from '../data/useCart.js'
import { useEffect, useState } from 'react'
import { apiRequest, normalizeProduct } from '../data/api.js'
import ProductImage from '../components/ProductImage.jsx'

const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString('en-IN')}`

export default function Cart() {
    const navigate = useNavigate()


    const {
        cart,
        loading,
        error,
        total,
        loadCart,
        updateQuantity,
        remove,
        clear,
        reset
    } = useCart()

    const [placingOrder, setPlacingOrder] =
        useState(false)

    const [orderError, setOrderError] =
        useState('')
    const [pendingItems, setPendingItems] = useState(() => new Set())
    const [delivery, setDelivery] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        region: '',
        postalCode: '',
    })
    const signedIn = Boolean(getUserId())

    useEffect(() => {
        loadCart()
    }, [loadCart])

    const handleCartAction = async (action) => {
        try {
            await action()
        } catch {
            // CartContext exposes mutation failures through its visible error message.
        }
    }

    const handleItemAction = async (itemId, action) => {
        if (pendingItems.has(itemId)) return
        setPendingItems((current) => new Set(current).add(itemId))
        try {
            await action()
        } catch {
            // CartContext exposes mutation failures through its visible error message.
        } finally {
            setPendingItems((current) => {
                const next = new Set(current)
                next.delete(itemId)
                return next
            })
        }
    }

    // ======================================
    // PLACE ORDER
    // ======================================

    const placeOrder = async (event) => {
        event.preventDefault()

        const userId = getUserId()

        if (!userId) {
            navigate('/login', { state: { from: '/cart' } })
            return
        }

        if (cart.length === 0) {
            return
        }

        try {
            setPlacingOrder(true)
            setOrderError('')

            const result = await apiRequest('/orders/create', {
                method: 'POST',
                body: JSON.stringify({ userId, delivery })
            })

            const orderId = Number(result.orderId ?? result.data?.orderId)

            if (!Number.isInteger(orderId) || orderId <= 0) {
                throw new Error('The order could not be created. Please try again.')
            }

            reset()
            navigate(`/orders/${orderId}`)

        } catch (err) {
            console.error(
                'Place order error:',
                err
            )

            setOrderError(
                err.message ||
                'Unable to place order'
            )

        } finally {
            setPlacingOrder(false)
        }
    }

    // ======================================
    // LOADING
    // ======================================

    if (loading) {
        return (
            <section className="sec">
                <p className="mute">
                    Loading your cart...
                </p>
            </section>
        )
    }

    return (
        <section className="sec">

            {/* ================= HEADER ================= */}

            <div className="sh">

                <div>
                    <p className="kicker">
                        CYBERFLIX / BAG
                    </p>

                    <h1>
                        Your bag.
                    </h1>

                    <p className="lead">
                        Review your selected PC components.
                    </p>
                </div>

                {cart.length > 0 && (
                    <button
                        className="btn ghost"
                        onClick={() => handleCartAction(clear)}
                    >
                        Clear cart
                    </button>
                )}

            </div>

            {/* ================= ERRORS ================= */}

            {error && cart.length > 0 && (
                <p className="form-error" role="alert">
                    {error}
                </p>
            )}

            {orderError && (
                <p className="form-error" role="alert">
                    {orderError}
                </p>
            )}

            {cart.length === 0 && error ? (
                <div className="panel cart-empty" role="alert">
                    <p className="kicker">BAG UNAVAILABLE</p>
                    <h2>We couldn't load your bag.</h2>
                    <p className="mute">{error}</p>
                    <button className="btn" type="button" onClick={loadCart}>
                        Try again
                    </button>
                </div>
            ) : (
            /* ================= EMPTY CART ================= */
            cart.length === 0 ? (

                <div className="panel cart-empty">
                    <p className="kicker">{signedIn ? 'YOUR BAG' : 'ACCOUNT CART'}</p>
                    <h2>{signedIn ? 'Your bag is empty.' : 'Sign in to view your cart.'}</h2>
                    <p className="mute">
                        {signedIn
                            ? 'Add components from the catalog to start your build.'
                            : 'Your cart is linked to your Cyberflix account. Sign in to see its contents, or explore the component catalog.'}
                    </p>
                    <div className="row">
                        {!signedIn && <Link className="btn" to="/login" state={{ from: '/cart' }}>Sign in</Link>}
                        <Link className={signedIn ? 'btn' : 'btn ghost'} to="/products">Shop components</Link>
                    </div>
                </div>

            ) : (

                /* ================= CART ================= */

                <div className="cart-layout">

                    {/* ================= CART LIST ================= */}

                    <div className="cart-list">

                        {cart.map((item) => {
                            const itemId = item.cart_id ?? item.id
                            const quantity = Number(item.quantity)
                            const stock = Number(item.stock)
                            const updating = pendingItems.has(itemId)
                            const stockLimit = Number.isFinite(stock) && stock >= 0

                            return (

                            <article
                                className="cart-item panel"
                                key={itemId}
                            >

                                {/* IMAGE */}

                                <div className="cart-image">

                                    <ProductImage p={normalizeProduct(item)} />

                                </div>

                                {/* PRODUCT INFO */}

                                <div className="cart-item-info">

                                    <p className="kicker">
                                        {item.category || 'PC COMPONENT'}
                                    </p>

                                    <h3>
                                        {item.name}
                                    </h3>

                                    {item.brand && (
                                        <p className="mute">
                                            {item.brand}
                                        </p>
                                    )}

                                    <p className="price">
                                        {formatPrice(item.price)}
                                    </p>

                                    {/* QUANTITY */}

                                    <div className="cart-actions">

                                        <button
                                            className="qty-btn"
                                            type="button"
                                            aria-label={`Decrease quantity of ${item.name}`}
                                            onClick={() => handleItemAction(itemId, () => updateQuantity(itemId, quantity - 1))}
                                            disabled={updating || quantity <= 1}
                                        >
                                            −
                                        </button>

                                        <span aria-live="polite" aria-atomic="true">
                                            {updating ? 'Updating…' : quantity}
                                        </span>

                                        <button
                                            className="qty-btn"
                                            type="button"
                                            aria-label={`Increase quantity of ${item.name}`}
                                            onClick={() => handleItemAction(itemId, () => updateQuantity(itemId, quantity + 1))}
                                            disabled={updating || (stockLimit && quantity >= stock)}
                                        >
                                            +
                                        </button>

                                        <button
                                            className="link"
                                            type="button"
                                            onClick={() => handleItemAction(itemId, () => remove(itemId))}
                                            disabled={updating}
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                                {/* ITEM TOTAL */}

                                <strong className="cart-item-subtotal" aria-label={`Subtotal ${formatPrice(Number(item.price) * quantity)}`}>
                                    {formatPrice(
                                        Number(item.price) * quantity
                                    )}
                                </strong>

                            </article>

                            )
                        })}

                    </div>

                    {/* ================= SUMMARY ================= */}

                    <form className="panel cart-summary checkout-form" onSubmit={placeOrder}>

                        <p className="kicker">
                            DELIVERY DETAILS
                        </p>

                        <h2>Delivery details</h2>
                        <label>
                            Full name
                            <input required autoComplete="name" maxLength={120} value={delivery.name}
                                onChange={(event) => setDelivery({ ...delivery, name: event.target.value })} />
                        </label>
                        <label>
                            Phone number
                            <input required type="tel" autoComplete="tel" maxLength={40} value={delivery.phone}
                                onChange={(event) => setDelivery({ ...delivery, phone: event.target.value })} />
                        </label>
                        <label>
                            Street address
                            <textarea required autoComplete="street-address" maxLength={500} rows={2} value={delivery.address}
                                onChange={(event) => setDelivery({ ...delivery, address: event.target.value })} />
                        </label>
                        <div className="checkout-location">
                            <label>
                                City
                                <input required autoComplete="address-level2" maxLength={120} value={delivery.city}
                                    onChange={(event) => setDelivery({ ...delivery, city: event.target.value })} />
                            </label>
                            <label>
                                State / region
                                <input required autoComplete="address-level1" maxLength={120} value={delivery.region}
                                    onChange={(event) => setDelivery({ ...delivery, region: event.target.value })} />
                            </label>
                        </div>
                        <label>
                            Postal code
                            <input required autoComplete="postal-code" maxLength={24} value={delivery.postalCode}
                                onChange={(event) => setDelivery({ ...delivery, postalCode: event.target.value })} />
                        </label>

                        <h2 className="checkout-summary-title">Order summary</h2>
                        <div className="summary-row">

                            <span>
                                Items
                            </span>

                            <span>
                                {cart.reduce(
                                    (sum, item) =>
                                        sum +
                                        Number(item.quantity),
                                    0
                                )}
                            </span>

                        </div>

                        <div className="summary-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>
                                {formatPrice(total)}
                            </strong>

                        </div>

                        <div className="summary-row">

                            <span>
                                Delivery
                            </span>

                            <span>
                                Free
                            </span>

                        </div>

                        <hr />

                        <div className="summary-row total">

                            <span>
                                Total
                            </span>

                            <strong>
                                {formatPrice(total)}
                            </strong>

                        </div>

                        <button
                            className="btn"
                            type="submit"
                            disabled={placingOrder}
                        >
                            {placingOrder
                                ? 'Placing order...'
                                : 'Place Order ↗'}
                        </button>

                    </form>

                </div>

            ))}

        </section>
    )
}

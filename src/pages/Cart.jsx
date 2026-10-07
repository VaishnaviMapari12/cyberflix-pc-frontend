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
    const [delivery, setDelivery] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        region: '',
        postalCode: '',
    })

    useEffect(() => {
        loadCart()
    }, [loadCart])

    // ======================================
    // PLACE ORDER
    // ======================================

    const placeOrder = async (event) => {
        event.preventDefault()
        if (cart.length === 0) {
            return
        }

        try {
            setPlacingOrder(true)
            setOrderError('')

            const result = await apiRequest('/orders/create', {
                method: 'POST',
                body: JSON.stringify({ userId: getUserId(), delivery })
            })

            reset()
            navigate(`/orders/${result.orderId || result.data?.orderId}`)

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
                        onClick={clear}
                    >
                        Clear cart
                    </button>
                )}

            </div>

            {/* ================= ERRORS ================= */}

            {error && (
                <p className="form-error" role="alert">
                    {error}
                </p>
            )}

            {orderError && (
                <p className="form-error" role="alert">
                    {orderError}
                </p>
            )}

            {/* ================= EMPTY CART ================= */}

            {cart.length === 0 ? (

                <div className="panel">

                    <h2>
                        Your bag is empty.
                    </h2>

                    <p className="mute">
                        Add some PC components to continue.
                    </p>

                    <Link
                        className="btn"
                        to="/products"
                    >
                        Shop components
                    </Link>

                </div>

            ) : (

                /* ================= CART ================= */

                <div className="cart-layout">

                    {/* ================= CART LIST ================= */}

                    <div className="cart-list">

                        {cart.map((item) => (

                            <article
                                className="cart-item panel"
                                key={item.cart_id ?? item.id}
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
                                            onClick={() => {
                                                const newQuantity =
                                                    Number(item.quantity) - 1

                                                if (
                                                    newQuantity >= 1
                                                ) {
                                                    updateQuantity(
                                                        item.cart_id ?? item.id,
                                                        newQuantity
                                                    )
                                                }
                                            }}
                                            disabled={
                                                Number(item.quantity) <= 1
                                            }
                                        >
                                            −
                                        </button>

                                        <span>
                                            {item.quantity}
                                        </span>

                                        <button
                                            className="qty-btn"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.cart_id ?? item.id,
                                                    Number(item.quantity) + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>

                                        <button
                                            className="link"
                                            onClick={() =>
                                                remove(item.cart_id ?? item.id)
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                                {/* ITEM TOTAL */}

                                <strong>
                                    {formatPrice(
                                        Number(item.price) *
                                        Number(item.quantity)
                                    )}
                                </strong>

                            </article>

                        ))}

                    </div>

                    {/* ================= SUMMARY ================= */}

                    <form className="panel cart-summary checkout-form" onSubmit={placeOrder}>

                        <p className="kicker">
                            SECURE CHECKOUT
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

            )}

        </section>
    )
}

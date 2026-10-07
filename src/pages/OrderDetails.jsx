import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductImage from '../components/ProductImage.jsx'
import { apiRequest, normalizeProduct } from '../data/api.js'
import { getUserId } from '../data/getUserId.js'

const formatPrice = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`

export default function OrderDetails() {
    const { orderId } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const userId = getUserId()
        if (!userId) {
            navigate('/login')
            return
        }

        let active = true
        apiRequest(`/orders/${userId}/${orderId}`)
            .then((result) => {
                if (active) setOrder(result.data)
            })
            .catch((requestError) => {
                if (active) setError(requestError.message || 'Unable to load order')
            })
            .finally(() => {
                if (active) setLoading(false)
            })

        return () => { active = false }
    }, [navigate, orderId])

    if (loading) {
        return <section className="sec"><p className="mute">Loading order details...</p></section>
    }

    if (error || !order) {
        return (
            <section className="sec">
                <div className="panel">
                    <p role="alert" className="mute">{error || 'Order not found'}</p>
                    <Link className="btn ghost" to="/profile">Back to account</Link>
                </div>
            </section>
        )
    }

    return (
        <section className="sec order-details">
            <div className="sh">
                <div>
                    <p className="kicker">ORDER CONFIRMATION</p>
                    <h1>Order #{order.id}</h1>
                    <p className="lead">
                        Placed {new Date(order.created_at).toLocaleString('en-IN', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                        })}
                    </p>
                </div>
                <span className="st check">{order.status}</span>
            </div>

            <div className="order-details-layout">
                <div className="order-detail-items">
                    {(order.items || []).map((item) => {
                        const product = normalizeProduct({
                            id: item.product_id || item.id,
                            name: item.product_name,
                            category: item.category,
                            brand: item.brand,
                            image: item.image,
                            description: item.product_description,
                            price: item.price,
                        })
                        return (
                            <article className="order-detail-item" key={item.id}>
                                <ProductImage p={product} />
                                <div>
                                    <p className="kicker">{item.category || 'PC COMPONENT'}</p>
                                    <h3>{item.product_name || 'Product'}</h3>
                                    {item.brand && <p className="mute">{item.brand}</p>}
                                    <p className="mute">{formatPrice(item.price)} each · Qty {item.quantity}</p>
                                </div>
                                <strong>{formatPrice(Number(item.price) * Number(item.quantity))}</strong>
                            </article>
                        )
                    })}
                    {(!order.items || order.items.length === 0) && <p className="mute">No item details are available for this order.</p>}
                </div>

                <div className="order-details-asides">
                    <aside className="panel delivery-panel">
                        <p className="kicker">DELIVERING TO</p>
                        {order.delivery_name ? (
                            <>
                                <h2>{order.delivery_name}</h2>
                                <p>{order.delivery_address}</p>
                                <p>{[order.delivery_city, order.delivery_region, order.delivery_postal_code].filter(Boolean).join(', ')}</p>
                                <p className="mute">{order.delivery_phone}</p>
                            </>
                        ) : (
                            <p className="mute">Delivery details were not recorded for this order.</p>
                        )}
                    </aside>
                    <aside className="panel order-total-panel">
                        <p className="kicker">ORDER SUMMARY</p>
                        <h2>Order total</h2>
                        <div className="summary-row">
                            <span>Products</span>
                            <span>{(order.items || []).reduce((count, item) => count + Number(item.quantity), 0)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-row total">
                            <strong>Total</strong>
                            <strong>{formatPrice(order.total_amount)}</strong>
                        </div>
                        <Link className="btn ghost" to="/profile">Order history</Link>
                    </aside>
                </div>
            </div>
        </section>
    )
}

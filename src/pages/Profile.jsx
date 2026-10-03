import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API_BASE } from '../data/api.js'

const API_URL = API_BASE

const formatPrice = (price) => {
    return `₹${Number(price || 0).toLocaleString('en-IN')}`
}

const getLoggedInUser = () => {
    const savedUser =
        localStorage.getItem('cyberflixUser') ||
        sessionStorage.getItem('cyberflixUser')

    if (!savedUser) {
        return null
    }

    try {
        return JSON.parse(savedUser)
    } catch (error) {
        console.error('User data error:', error)
        return null
    }
}

export default function Profile() {
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [orders, setOrders] = useState([])
    const [ordersLoading, setOrdersLoading] = useState(false)
    const [ordersError, setOrdersError] = useState('')

    // =========================
    // LOAD USER
    // =========================
    useEffect(() => {
        const savedUser = getLoggedInUser()

        if (!savedUser) {
            navigate('/login')
            return
        }

        setUser(savedUser)
    }, [navigate])

    // =========================
    // LOAD ORDERS
    // =========================
    useEffect(() => {
        if (!user?.id) {
            return
        }

        const loadOrders = async () => {
            try {
                setOrdersLoading(true)
                setOrdersError('')

                const response = await fetch(
                    `${API_URL}/orders/${user.id}`
                )

                const result = await response.json()

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message ||
                        'Failed to load orders'
                    )
                }

                setOrders(result.data || [])

            } catch (error) {
                console.error(
                    'Orders error:',
                    error
                )

                setOrdersError(
                    error.message ||
                    'Unable to load orders'
                )
            } finally {
                setOrdersLoading(false)
            }
        }

        loadOrders()
    }, [user])

    // =========================
    // LOGOUT
    // =========================
    const logout = () => {
        localStorage.removeItem('cyberflixUser')
        sessionStorage.removeItem('cyberflixUser')

        navigate('/login')
    }

    // =========================
    // LOADING PROFILE
    // =========================
    if (!user) {
        return (
            <section className="sec">
                <p className="mute">
                    Loading profile...
                </p>
            </section>
        )
    }

    // =========================
    // INITIALS
    // =========================
    const initials = user.name
        ? user.name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()
        : 'CF'

    return (
        <section className="sec account-page">

            {/* PROFILE HEADER */}
            <div className="profile-hero panel">

                <div className="avatar">
                    {initials}
                </div>

                <div>
                    <p className="kicker">
                        MY CYBERFLIX
                    </p>

                    <h1>
                        Your profile.
                    </h1>

                    <p className="mute">
                        Manage your saved builds,
                        orders, and account details
                        in one place.
                    </p>
                </div>

                <div className="row">

                    <Link
                        className="btn ghost"
                        to="/contact"
                    >
                        Get support
                    </Link>

                    <button
                        className="btn ghost"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* ACCOUNT + ORDERS */}
            <div className="profile-grid">

                {/* ACCOUNT DETAILS */}
                <section className="panel profile-section">

                    <p className="kicker">
                        ACCOUNT DETAILS
                    </p>

                    <h2>
                        {user.name}
                    </h2>

                    <p className="mute">
                        {user.email}
                    </p>

                    <p className="mute">
                        Cyberflix Customer
                    </p>

                    <button
                        className="btn ghost sm"
                        type="button"
                    >
                        Edit profile
                    </button>

                </section>

                {/* RECENT ORDERS */}
                <section className="panel profile-section">

                    <p className="kicker">
                        RECENT ORDERS
                    </p>

                    {ordersLoading ? (

                        <div>
                            <h2>
                                Loading orders...
                            </h2>

                            <p className="mute">
                                Please wait.
                            </p>
                        </div>

                    ) : ordersError ? (

                        <div>
                            <h2>
                                Unable to load orders.
                            </h2>

                            <p
                                style={{
                                    color: '#d33'
                                }}
                            >
                                {ordersError}
                            </p>
                        </div>

                    ) : orders.length === 0 ? (

                        <div>
                            <h2>
                                No orders yet.
                            </h2>

                            <p className="mute">
                                Your completed purchases
                                will appear here.
                            </p>

                            <Link
                                className="btn sm"
                                to="/products"
                            >
                                Shop components
                            </Link>
                        </div>

                    ) : (

                        <div>

                            <h2>
                                {orders.length}{' '}
                                {orders.length === 1
                                    ? 'Order'
                                    : 'Orders'}
                            </h2>

                            <p className="mute">
                                Your recent purchases.
                            </p>

                        </div>

                    )}

                </section>

            </div>

            {/* ORDERS LIST */}
            {orders.length > 0 && (

                <section className="panel saved-builds">

                    <div className="sh">

                        <div>
                            <p className="kicker">
                                ORDER HISTORY
                            </p>

                            <h2>
                                Your orders.
                            </h2>
                        </div>

                        <Link
                            className="btn sm"
                            to="/products"
                        >
                            Continue shopping ↗
                        </Link>

                    </div>

                    {orders.map((order) => (

                        <div
                            className="saved-build"
                            key={order.id}
                        >

                            <div>

                                <h3>
                                    Order #{order.id}
                                </h3>

                                <p className="mute">

                                    {order.items &&
                                        order.items.length > 0
                                        ? order.items
                                            .map(
                                                (item) =>
                                                    `${item.product_name || item.name} × ${item.quantity}`
                                            )
                                            .join(', ')
                                        : 'PC Components'}

                                </p>

                                <p className="mute">

                                    {order.created_at
                                        ? new Date(
                                            order.created_at
                                        ).toLocaleDateString(
                                            'en-IN',
                                            {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            }
                                        )
                                        : ''}

                                </p>

                            </div>

                            <div>

                                <strong>
                                    {formatPrice(
                                        order.total_amount
                                    )}
                                </strong>

                                <br />

                                <span className="st check">
                                    {order.status}
                                </span>

                                <p>
                                    <Link className="link" to={`/orders/${order.id}`}>
                                        View order details →
                                    </Link>
                                </p>

                            </div>

                        </div>

                    ))}

                </section>

            )}

            {/* SAVED BUILDS */}
            <section className="panel saved-builds">

                <div className="sh">

                    <div>
                        <p className="kicker">
                            SAVED BUILDS
                        </p>

                        <h2>
                            Keep designing.
                        </h2>
                    </div>

                    <Link
                        className="btn sm"
                        to="/builder"
                    >
                        New build ↗
                    </Link>

                </div>

                <div className="saved-build">

                    <div>

                        <h3>
                            1440p Creator Rig
                        </h3>

                        <p className="mute">
                            Ryzen 7 7800X3D ·
                            RTX 4070 SUPER
                        </p>

                    </div>

                    <span className="st check">
                        Ready to build
                    </span>

                </div>

                <div className="saved-build">

                    <div>

                        <h3>
                            Quiet Workstation
                        </h3>

                        <p className="mute">
                            32GB DDR5 · 2TB NVMe
                        </p>

                    </div>

                    <span className="st check">
                        Saved draft
                    </span>

                </div>

            </section>

        </section>
    )
}
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../data/useCart.js'
import { useWishlist } from '../data/useWishlist.jsx'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const { itemCount } = useCart()
    const { count: wishlistCount } = useWishlist()
    const close = () => setOpen(false)

    return (
        <>
            <div className="top">
                <span>FREE DELIVERY ON SELECT BUILDS</span>
                <span>SUPPORT: 1800-CYBERFLIX</span>
            </div>
            <header className="nav">
                <div className="left">
                    <button
                        className="burger"
                        type="button"
                        onClick={() => setOpen(!open)}
                        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={open}
                        aria-controls="primary-navigation"
                    >
                        <span />
                        <span />
                    </button>
                    <Link to="/" className="logo" onClick={close}>
                        <img src="/cyberflix-logo.svg" alt="Cyberflix Systems LLP" />
                        <span>CYBERFLIX<small>SYSTEMS LLP</small></span>
                    </Link>
                </div>
                <nav id="primary-navigation" className={open ? 'links open' : 'links'} aria-label="Main navigation">
                    <NavLink to="/" end onClick={close}>Discover</NavLink>
                    <NavLink to="/products" onClick={close}>Components</NavLink>
                    <NavLink to="/builder" onClick={close}>PC Builder <span className="tag">NEW</span></NavLink>
                    <NavLink to="/info/journal" onClick={close}>Journal</NavLink>
                </nav>
                <div className="right">
                    <Link to="/products" className="search-nav" aria-label="Browse and search components">
                        <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
                    </Link>
                    <Link to="/login" className="account-link">Account</Link>
                    <Link to="/wishlist" className="wishlist-nav" aria-label={`Wishlist, ${wishlistCount} saved items`}>
                        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.8 8.8c0 5.3-8.8 11-8.8 11s-8.8-5.7-8.8-11A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z" /></svg>
                        <span>{String(wishlistCount).padStart(2, '0')}</span>
                    </Link>
                    <Link to="/cart" className="bag" aria-label={`Cart, ${itemCount} items`}>
                        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L21 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
                        <span>Bag</span><span className="bag-count">{String(itemCount).padStart(2, '0')}</span>
                    </Link>
                </div>
            </header>
        </>
    )
}
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../data/CartContext.jsx'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const { itemCount } = useCart()
    const close = () => setOpen(false)

    return (
        <>
            <div className="top">
                <span>FREE DELIVERY ON BUILDS OVER $500</span>
                <span>SUPPORT: 1800-CYBERFLIX</span>
            </div>
            <header className="nav">
                <div className="left">
                    <button className="burger" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
                    <Link to="/" className="logo" onClick={close}>✦ CYBERFLIX <small>SYSTEMS LLP</small></Link>
                </div>
                <nav className={open ? 'links open' : 'links'}>
                    <NavLink to="/" end onClick={close}>Discover</NavLink>
                    <NavLink to="/products" onClick={close}>Components</NavLink>
                    <NavLink to="/builder" onClick={close}>PC Builder <span className="tag">NEW</span></NavLink>
                    <NavLink to="/info/journal" onClick={close}>Journal</NavLink>
                </nav>
                <div className="right">
                    <Link to="/products" aria-label="Search components">⌕</Link>
                    <Link to="/login" className="account-link">Account</Link>
                    <Link to="/cart" className="bag">Bag {String(itemCount).padStart(2, '0')}</Link>
                </div>
            </header>
        </>
    )
}
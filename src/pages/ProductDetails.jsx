import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductImage from '../components/ProductImage.jsx'
import ProductCard from '../components/Productcard.jsx'
import { useCart } from '../data/useCart.js'
import { categories, formatPrice } from '../data/products.js'
import { useCatalog } from '../data/useCatalog.js'
import { useWishlist } from '../data/useWishlist.jsx'
import { getUserId } from '../data/getUserId.js'

export default function ProductDetails() {
    const { id } = useParams()
    const { add } = useCart()
    const wishlist = useWishlist()
    const { products: catalogProducts, loading, error, retry } = useCatalog()
    const products = catalogProducts
    const [cartMessage, setCartMessage] = useState('')
    const [adding, setAdding] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const signedIn = Boolean(getUserId())
    const p = products.find((x) => String(x.id) === id)

    if (loading) {
        return <section className="sec"><p className="mute">Loading component...</p></section>
    }

    if (!p) {
        return (
            <section className="sec components-page">
                <div className="components-empty">
                    <span aria-hidden="true">⌕</span>
                    <h2>Component unavailable</h2>
                    <p className="mute">
                        {error || 'This component may have been removed or is no longer available.'}
                    </p>
                    {error && <button className="btn ghost" type="button" onClick={retry}>Retry connection</button>}
                    <Link className="btn" to="/products">Back to components</Link>
                </div>
            </section>
        )
    }
    const cat = categories.find((c) => c.id === p.cat) || categories[categories.length - 1]
    const related = products.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4)
    const stock = Number(p.stock)
    const hasStock = Number.isFinite(stock)
    const outOfStock = hasStock && stock <= 0
    const addToBag = async () => {
        if (!signedIn) {
            setCartMessage('Sign in to add this component to your bag.')
            return
        }
        setAdding(true)
        setCartMessage('')
        try {
            await add(p.id, quantity)
            setCartMessage('Added to your bag.')
        } catch (addError) {
            setCartMessage(addError.message || 'Unable to add this component to your bag.')
        } finally {
            setAdding(false)
        }
    }

    return (
        <>
            <section className="sec detail">
                <div className="dimg"><ProductImage p={p} loading="eager" /></div>
                <div>
                    <Link className="detail-back" to="/products">Components <span aria-hidden="true">/</span> {cat.name}</Link>
                    <p className="kicker">CYBERFLIX / {cat.label.toUpperCase()}</p>
                    <h1>{p.name}</h1>
                    {p.rating != null && (
                        <p className="rate">★ {p.rating} {p.reviews != null && <small>({p.reviews.toLocaleString('en-US')} reviews)</small>}</p>
                    )}
                    {p.brand && <p className="product-brand">{p.brand}</p>}
                    <p className="detail-description">{p.description || p.spec}</p>
                    {hasStock && (
                        <p className={outOfStock ? 'detail-stock is-out' : 'detail-stock'}>
                            <span aria-hidden="true" />{outOfStock ? 'Currently out of stock' : 'In stock and ready to ship'}
                        </p>
                    )}
                    <div className="tags big">{String(p.spec || 'PC component').split(' · ').map((s) => <span key={s}>{s}</span>)}</div>
                    <p className="price">{formatPrice(p.price)}</p>
                    <div className="row">
                        <label className="quantity-select">
                            Quantity
                            <select
                                value={quantity}
                                onChange={(event) => setQuantity(Number(event.target.value))}
                                disabled={outOfStock || p.previewOnly}
                            >
                                {Array.from({ length: Math.min(hasStock ? stock : 10, 10) }, (_, index) => index + 1)
                                    .map((amount) => <option key={amount} value={amount}>{amount}</option>)}
                            </select>
                        </label>
                        <button
                            className="btn"
                            onClick={addToBag}
                            disabled={adding || p.previewOnly || outOfStock}
                            title={p.previewOnly ? 'Live bag is unavailable while the store service is offline' : undefined}
                        >
                            {adding ? 'Adding...' : outOfStock ? 'Out of stock' : 'Add to bag'}
                        </button>
                        <button
                            className="btn ghost"
                            type="button"
                            onClick={() => wishlist.toggle(p)}
                            aria-pressed={wishlist.isSaved(p.id)}
                        >
                            {wishlist.isSaved(p.id) ? '♥ Saved' : '♡ Save to wishlist'}
                        </button>
                        <Link className="btn ghost" to="/builder">Use in PC Builder</Link>
                    </div>
                    {p.previewOnly && <p className="catalog-preview-note" role="status">Preview component · live stock and bag actions are unavailable.</p>}
                    {cartMessage && <p className="mute" role="status">{cartMessage}</p>}
                    {cartMessage && !signedIn && (
                        <Link className="btn ghost sm" to="/login" state={{ from: `/product/${p.id}` }}>
                            Sign in to add to your bag
                        </Link>
                    )}
                    {Object.entries(p.c || {}).filter(([, value]) => value !== null && value !== undefined && value !== '').length > 0 && (
                        <ul className="specs">
                            {Object.entries(p.c || {}).filter(([, value]) => value !== null && value !== undefined && value !== '').map(([k, v]) => (
                                <li key={k}><span>{k}</span>{[].concat(v).join(', ')}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
            {related.length > 0 && (
                <section className="sec">
                    <h2>More {cat.sub.toLowerCase()}</h2>
                    <div className="grid">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
                </section>
            )}
        </>
    )
}
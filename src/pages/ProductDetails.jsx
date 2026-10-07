import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductImage from '../components/ProductImage.jsx'
import ProductCard from '../components/Productcard.jsx'
import { useCart } from '../data/useCart.js'
import { categories, formatPrice } from '../data/products.js'
import { useCatalog } from '../data/useCatalog.js'
import { useWishlist } from '../data/useWishlist.jsx'

export default function ProductDetails() {
    const { id } = useParams()
    const { add } = useCart()
    const wishlist = useWishlist()
    const { products, loading, error } = useCatalog()
    const [cartMessage, setCartMessage] = useState('')
    const [adding, setAdding] = useState(false)
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
                    <Link className="btn" to="/products">Back to components</Link>
                </div>
            </section>
        )
    }
    const cat = categories.find((c) => c.id === p.cat) || categories[categories.length - 1]
    const related = products.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4)
    const addToBag = async () => {
        setAdding(true)
        setCartMessage('')
        try {
            await add(p.id)
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
                <div className="dimg"><ProductImage p={p} /></div>
                <div>
                    <p className="kicker">CYBERFLIX / {cat.label.toUpperCase()}</p>
                    <h1>{p.name}</h1>
                    <p className="rate">★ {p.rating} <small>({p.reviews.toLocaleString('en-US')} reviews)</small></p>
                    <div className="tags big">{p.spec.split(' · ').map((s) => <span key={s}>{s}</span>)}</div>
                    <p className="price">{formatPrice(p.price)}</p>
                    <div className="row">
                        <button className="btn" onClick={addToBag} disabled={adding}>
                            {adding ? 'Adding...' : 'Add to bag'}
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
                    {cartMessage && <p className="mute" role="status">{cartMessage}</p>}
                    {Object.keys(p.c || {}).length > 0 && (
                        <ul className="specs">
                            {Object.entries(p.c || {}).map(([k, v]) => (
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
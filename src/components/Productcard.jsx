import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductImage from './ProductImage.jsx'
import { useCart } from '../data/useCart.js'
import { categories, formatPrice } from '../data/products.js'
import { useWishlist } from '../data/useWishlist.jsx'
import { getUserId } from '../data/getUserId.js'

export default function ProductCard({ p, wishlist = false }) {
    const { add } = useCart()
    const savedItems = useWishlist()
    const [adding, setAdding] = useState(false)
    const [error, setError] = useState('')
    const category = categories.find((item) => item.id === p.cat) || categories[categories.length - 1]
    const saved = savedItems.isSaved(p.id)
    const signedIn = Boolean(getUserId())
    const stock = Number(p.stock)
    const outOfStock = Number.isFinite(stock) && stock <= 0

    const addToBag = async () => {
        if (p.previewOnly || outOfStock) return
        if (!signedIn) {
            setError('Sign in to add this component to your bag.')
            return
        }
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
            <button
                className={`wishlist-toggle${saved ? ' is-saved' : ''}`}
                type="button"
                onClick={() => savedItems.toggle(p)}
                aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                aria-pressed={saved}
            >
                {saved ? '♥' : '♡'}
            </button>
            <div className="body">
                <div className="meta">
                    <small>{category.label}</small>
                    {p.rating != null && (
                        <span className="rate">★ {p.rating} {p.reviews != null && <small>({Number(p.reviews).toLocaleString('en-US')})</small>}</span>
                    )}
                </div>
                <Link to={`/product/${p.id}`}><h3>{p.name}</h3></Link>
                {p.brand && <p className="product-brand">{p.brand}</p>}
                <div className="tags">{String(p.spec || 'PC component').split(' · ').map((spec) => <span key={spec}>{spec}</span>)}</div>
                <div className="foot">
                    <div className="product-price-stock">
                        <b>{formatPrice(Number(p.price) || 0)}</b>
                        {!p.previewOnly && Number.isFinite(stock) && (
                            <span className={outOfStock ? 'stock-status is-out' : 'stock-status'}>
                                {outOfStock ? 'Out of stock' : 'In stock'}
                            </span>
                        )}
                    </div>
                    <div className="acts">
                        <Link className="btn ghost sm" to={`/product/${p.id}`}>View details</Link>
                        <button
                            className="btn sm"
                            onClick={addToBag}
                            disabled={adding || p.previewOnly || outOfStock}
                            title={p.previewOnly ? 'Live bag is unavailable while the store service is offline' : outOfStock ? 'This component is out of stock' : undefined}
                        >
                            {adding ? 'Adding...' : outOfStock ? 'Out of stock' : 'Add to bag'}
                        </button>
                        {wishlist && (
                            <button className="btn ghost sm" onClick={() => savedItems.remove(p.id)}>
                                Remove
                            </button>
                        )}
                    </div>
                    {error && (
                        <small role="alert">
                            {error}{!signedIn && <> <Link to="/login" state={{ from: `/product/${p.id}` }}>Sign in</Link></>}
                        </small>
                    )}
                </div>
            </div>
        </article>
    )
}

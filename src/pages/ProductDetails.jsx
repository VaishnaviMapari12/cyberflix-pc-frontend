import { Link, useParams } from 'react-router-dom'
import ProductImage from '../components/ProductImage.jsx'
import ProductCard from '../components/Productcard.jsx'
import { useCart } from '../data/CartContext.jsx'
import { categories, usd } from '../data/products.js'
import { useCatalog } from '../data/useCatalog.js'

export default function ProductDetails() {
    const { id } = useParams()
    const { add } = useCart()
    const { products, loading, error } = useCatalog()
    const p = products.find((x) => String(x.id) === id)

    if (loading) {
        return <section className="sec"><p className="mute">Loading component...</p></section>
    }

    if (!p) {
        return (
            <section className="sec">
                <h2>{error || 'Component not found'}</h2>
                <Link className="btn" to="/products">Back to components</Link>
            </section>
        )
    }
    const cat = categories.find((c) => c.id === p.cat)
    const related = products.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4)

    return (
        <>
            <section className="sec detail">
                <div className="dimg"><ProductImage p={p} /></div>
                <div>
                    <p className="kicker">CYBERFLIX / {cat.label.toUpperCase()}</p>
                    <h1>{p.name}</h1>
                    <p className="rate">★ {p.rating} <small>({p.reviews.toLocaleString('en-US')} reviews)</small></p>
                    <div className="tags big">{p.spec.split(' · ').map((s) => <span key={s}>{s}</span>)}</div>
                    <p className="price">{usd(p.price)}</p>
                    <div className="row">
                        <button className="btn" onClick={() => add(p.id)}>Add to bag</button>
                        <Link className="btn ghost" to="/builder">Use in PC Builder</Link>
                    </div>
                    {Object.keys(p.c).length > 0 && (
                        <ul className="specs">
                            {Object.entries(p.c).map(([k, v]) => (
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
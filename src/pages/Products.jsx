import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/Productcard.jsx'
import ProductImage from '../components/ProductImage.jsx'
import { categories, products } from '../data/products.js'
import { useCatalog } from '../data/useCatalog.js'

export default function Products() {
    const { products: catalogProducts, loading, error } = useCatalog()
    const [sp, setSp] = useSearchParams()
    const cat = sp.get('cat') || 'all'
    const [q, setQ] = useState('')
    const [sort, setSort] = useState('')
    const cur = categories.find((c) => c.id === cat)

    let list = catalogProducts.filter(
        (p) => (cat === 'all' || p.cat === cat) && p.name.toLowerCase().includes(q.toLowerCase())
    )
    if (sort === 'lo') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'hi') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rt') list = [...list].sort((a, b) => b.rating - a.rating)

    if (loading) {
        return <section className="sec"><p className="mute">Loading components...</p></section>
    }

    return (
        <section className="sec">
            {cur ? (
                <div className="cbanner">
                    <ProductImage cat={cur.id} />
                    <div>
                        <p className="kicker">{cur.label}</p>
                        <h2>{cur.name}</h2>
                        <p className="mute">{list.length} products</p>
                    </div>
                </div>
            ) : (
                <h2>Components</h2>
            )}
            <div className="chips">
                <button className={cat === 'all' ? 'on' : ''} onClick={() => setSp({})}>All</button>
                {categories.map((c) => (
                    <button key={c.id} className={cat === c.id ? 'on' : ''} onClick={() => setSp({ cat: c.id })}>
                        {c.icon} {c.name}
                    </button>
                ))}
            </div>
            <div className="row">
                <input placeholder="Search components" value={q} onChange={(e) => setQ(e.target.value)} />
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="">Sort: Featured</option>
                    <option value="rt">Top rated</option>
                    <option value="lo">Price: low to high</option>
                    <option value="hi">Price: high to low</option>
                </select>
            </div>
            {error && <p role="alert" className="mute">{error}</p>}
            <div className="grid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
            {!list.length && <p className="mute">No components match. Try another category or search.</p>}
        </section>
    )
}
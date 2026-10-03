import { Link } from 'react-router-dom'
import ProductImage from './ProductImage.jsx'

export default function CategoryCard({ c, products = [] }) {
    const n = products.filter((p) => p.cat === c.id).length
    return (
        <Link to={`/products?cat=${c.id}`} className="tile">
            <ProductImage cat={c.id} />
            <div className="tmeta">
                <div><small>{c.label}</small><b>{c.sub}</b></div>
                <span>{n} items ↗</span>
            </div>
        </Link>
    )
}
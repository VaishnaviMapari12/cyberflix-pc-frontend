import { Link } from 'react-router-dom'
import { categories } from '../data/products.js'

const company = [['About us', 'about-us'], ['Shipping & returns', 'shipping-returns'], ['Warranty', 'warranty']]

export default function Footer() {
    return (
        <footer>
            <div className="fgrid">
                <div>
                    <Link className="logo" to="/">✦ CYBERFLIX</Link>
                    <p className="mute">Performance hardware, thoughtfully assembled.</p>
                    <p className="mute">Cyberflix Systems LLP<br />Support: 1800-CYBERFLIX</p>
                </div>
                <div>
                    <h3>Shop</h3>
                    {categories.slice(0, 6).map((c) => <Link key={c.id} to={`/products?cat=${c.id}`}>{c.name}</Link>)}
                </div>
                <div>
                    <h3>Build</h3>
                    <Link to="/builder">PC Builder</Link>
                    <Link to="/products">All components</Link>
                    <Link to="/cart">Bag</Link>
                </div>
                <div>
                    <h3>Company</h3>
                    {company.map(([label, slug]) => <Link key={slug} to={`/info/${slug}`}>{label}</Link>)}
                    <Link to="/contact">Contact support</Link>
                    <Link to="/login">Login / profile</Link>
                    <div className="status"><i className="dot" />ALL SYSTEMS OPERATIONAL</div>
                </div>
            </div>
            <p className="copy">© 2026 CYBERFLIX SYSTEMS LLP</p>
        </footer>
    )
}
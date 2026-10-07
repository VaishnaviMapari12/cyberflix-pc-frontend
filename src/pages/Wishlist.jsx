import { Link } from 'react-router-dom'
import ProductCard from '../components/Productcard.jsx'
import { useWishlist } from '../data/useWishlist.jsx'

export default function Wishlist() {
    const { items } = useWishlist()

    return (
        <section className="sec wishlist-page">
            <header className="sh wishlist-heading">
                <div>
                    <p className="kicker">CYBERFLIX / SAVED COMPONENTS</p>
                    <h1>Your wishlist.</h1>
                    <p className="lead">
                        Keep the parts you love close while you plan your next build.
                    </p>
                </div>
                <Link className="btn ghost" to="/products">Explore components</Link>
            </header>

            {items.length ? (
                <div className="grid wishlist-grid">
                    {items.map((product) => (
                        <ProductCard key={product.id} p={product} wishlist />
                    ))}
                </div>
            ) : (
                <div className="components-empty wishlist-empty">
                    <span aria-hidden="true">♡</span>
                    <h2>Your wishlist is waiting.</h2>
                    <p className="mute">Save components here to compare and add them to your bag later.</p>
                    <Link className="btn" to="/products">Browse components</Link>
                </div>
            )}
        </section>
    )
}

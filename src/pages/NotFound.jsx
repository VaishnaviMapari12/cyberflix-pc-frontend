import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <section className="sec">
            <p className="kicker">404 / NOT FOUND</p>
            <h1>Page not found.</h1>
            <p className="lead">The page you requested does not exist or may have moved.</p>
            <Link className="btn" to="/">Back to home</Link>
        </section>
    )
}

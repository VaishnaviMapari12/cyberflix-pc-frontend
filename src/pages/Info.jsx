import { Link, useParams } from 'react-router-dom'

const pages = {
    'about-us': 'About us',
    'shipping-returns': 'Shipping & returns',
    warranty: 'Warranty',
    journal: 'Journal',
}

export default function Info() {
    const { slug } = useParams()
    const title = pages[slug] || 'Page not found'
    return (
        <section className="sec">
            <h1>{title}</h1>
            <p className="lead">This page is ready for your content. Add the Cyberflix Systems LLP details for it here.</p>
            <Link className="btn" to="/">Back to home</Link>
        </section>
    )
}
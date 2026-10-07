import { Link, useParams } from 'react-router-dom'
import NotFound from './NotFound.jsx'

const pages = {
    'about-us': 'About us',
    'shipping-returns': 'Shipping & returns',
    warranty: 'Warranty',
    journal: 'Journal',
}

const journalEntries = [
    {
        number: '01',
        category: 'LATEST UPDATES',
        title: 'Build the Right PC for Your Needs',
        summary: 'Choosing the right PC components can make a significant difference in performance, reliability, and overall value. From processors and graphics cards to RAM, storage, power supplies, and cooling solutions, every component plays an important role in creating a balanced system.',
    },
    {
        number: '02',
        category: 'PC BUILDING GUIDES',
        title: 'Build with confidence',
        summary: 'Explore practical tips and guidance for selecting compatible components, understanding hardware specifications, and building a reliable PC configuration.',
    },
    {
        number: '03',
        category: 'TECHNOLOGY & INNOVATION',
        title: 'What’s shaping PC technology',
        summary: 'Stay updated with the latest trends in computer hardware, PC components, and technology solutions from Cyberflix Systems LLP.',
    },
]

function Journal() {
    return (
        <section className="sec journal-page">
            <header className="journal-intro">
                <p className="kicker">CYBERFLIX / JOURNAL</p>
                <h1>Insights, Updates<br />&amp; Technology</h1>
                <p className="lead">
                    Welcome to the Cyberflix Systems LLP Journal — a space where we share
                    technology insights, product updates, PC-building guides, and useful
                    information for PC enthusiasts and businesses.
                </p>
            </header>

            <div className="sh journal-section-heading">
                <div>
                    <p className="kicker">CYBERFLIX / FIELD NOTES</p>
                    <h2>Latest Updates</h2>
                </div>
            </div>
            <div className="journal-grid">
                {journalEntries.map((entry) => (
                    <article className="journal-card" key={entry.number}>
                        <div className="journal-card-top">
                            <span className="journal-number">{entry.number}</span>
                            <span className="kicker">{entry.category}</span>
                        </div>
                        <h2>{entry.title}</h2>
                        <p>{entry.summary}</p>
                    </article>
                ))}
            </div>

            <section className="journal-value panel">
                <p className="kicker">BALANCED BUILDS / BETTER VALUE</p>
                <h2>Why Choose the Right Components?</h2>
                <p>
                    A well-balanced PC configuration provides better performance, stability,
                    upgradeability, and long-term value. Our goal is to make component
                    selection simple and help users build systems that match their
                    requirements and budget.
                </p>
            </section>

            <footer className="journal-footer panel">
                <div>
                    <p className="kicker">STAY CONNECTED</p>
                    <h2>More ideas for your next build.</h2>
                    <p>
                        Keep checking the Cyberflix Systems LLP Journal for new technology
                        insights, product updates, guides, and PC-building tips.
                    </p>
                    <span className="journal-signoff">Cyberflix Systems LLP <span>Technology • PC Components • Smart Builds</span></span>
                </div>
                <Link className="btn" to="/products">Explore components ↗</Link>
            </footer>
        </section>
    )
}

export default function Info() {
    const { slug } = useParams()
    const title = pages[slug]

    if (!title) {
        return <NotFound />
    }

    if (slug === 'journal') {
        return <Journal />
    }

    return (
        <section className="sec">
            <h1>{title}</h1>
            <p className="lead">This page is ready for your content. Add the Cyberflix Systems LLP details for it here.</p>
            <Link className="btn" to="/">Back to home</Link>
        </section>
    )
}
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

const infoContent = {
    'about-us': {
        intro: 'Cyberflix Systems LLP helps PC enthusiasts explore components and plan custom builds.',
        sections: [
            ['A considered component range', 'Browse processors, graphics cards, memory, storage, cooling, cases, displays, and accessories in one place.'],
            ['Build with clarity', 'Use the PC Builder to assemble a parts list and request a compatibility check against the store catalog.'],
        ],
    },
    'shipping-returns': {
        intro: 'Delivery options and return eligibility can vary by product and destination.',
        sections: [
            ['Before placing an order', 'Review the product and delivery details shown at checkout. If you need clarification about an item or destination, contact support before ordering.'],
            ['Need help with an order?', 'Contact the Cyberflix support team with your order number so they can confirm the applicable delivery or return information.'],
        ],
    },
    warranty: {
        intro: 'Warranty coverage can differ by component and manufacturer.',
        sections: [
            ['Check product coverage', 'Review the warranty information supplied with the product and its manufacturer documentation for the applicable terms and duration.'],
            ['Support with a warranty query', 'Contact Cyberflix support with your order details and component information for assistance with the next steps.'],
        ],
    },
}

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

    const content = infoContent[slug]

    return (
        <section className="sec info-page">
            <header className="journal-intro">
                <p className="kicker">CYBERFLIX / INFORMATION</p>
                <h1>{title}</h1>
                <p className="lead">{content.intro}</p>
            </header>
            <div className="info-sections">
                {content.sections.map(([heading, body]) => (
                    <article className="journal-card" key={heading}>
                        <h2>{heading}</h2>
                        <p>{body}</p>
                    </article>
                ))}
            </div>
            <div className="info-footer panel">
                <div>
                    <p className="kicker">QUESTIONS?</p>
                    <h2>Talk to our support team.</h2>
                    <p className="mute">Get help with components, orders, and build planning.</p>
                </div>
                <Link className="btn" to="/contact">Contact support</Link>
            </div>
        </section>
    )
}
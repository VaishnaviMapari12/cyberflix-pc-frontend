import { useState } from 'react'

export default function Contact() {
    const [sent, setSent] = useState(false)

    const submit = (event) => {
        event.preventDefault()
        setSent(true)
    }

    return (
        <section className="sec account-page">
            <div className="account-heading">
                <p className="kicker">CYBERFLIX SUPPORT</p>
                <h1>Let’s talk hardware.</h1>
                <p className="lead">Questions about a component, a custom build, or an order? Our team is ready to help.</p>
            </div>
            <div className="contact-layout">
                <div className="contact-info panel">
                    <p className="kicker">CONTACT DETAILS</p>
                    <h2>Real people. Real answers.</h2>
                    <div className="contact-detail"><span>Email</span><strong>support@cyberflix.in</strong></div>
                    <div className="contact-detail"><span>Phone</span><strong>1800-CYBERFLIX</strong></div>
                    <div className="contact-detail"><span>Hours</span><strong>Mon–Sat, 10:00–18:00 IST</strong></div>
                    <div className="contact-detail"><span>Office</span><strong>Cyberflix Systems LLP<br />Bengaluru, India</strong></div>
                </div>
                <form className="form-card panel" onSubmit={submit}>
                    <div className="form-grid">
                        <label>Name<input required name="name" placeholder="Your name" /></label>
                        <label>Email<input required type="email" name="email" placeholder="you@example.com" /></label>
                    </div>
                    <label>What can we help with?
                        <select name="topic" defaultValue="order">
                            <option value="order">Order support</option>
                            <option value="build">PC build advice</option>
                            <option value="product">Product question</option>
                            <option value="other">Something else</option>
                        </select>
                    </label>
                    <label>Message<textarea required name="message" rows="6" placeholder="Tell us what you are building..."></textarea></label>
                    {sent && <p className="ok form-success">Thanks. Your message is ready for the Cyberflix support team.</p>}
                    <button className="btn" type="submit">Send message ↗</button>
                </form>
            </div>
        </section>
    )
}

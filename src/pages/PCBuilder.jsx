import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductImage from '../components/ProductImage.jsx'
import { getUserId } from '../data/getUserId.js'
import { useCart } from '../data/useCart.js'
import { apiRequest, normalizeProduct } from '../data/api.js'
import { formatPrice } from '../data/products.js'

const slots = [
    ['cpu', 'Processor', 'cpu'],
    ['gpu', 'Graphics Card', 'gpu'],
    ['motherboard', 'Motherboard', 'motherboard'],
    ['ram', 'Memory', 'ram'],
    ['storage', 'Storage', 'storage'],
    ['cooler', 'CPU Cooler', 'cooler'],
    ['psu', 'Power Supply', 'psu'],
    ['case', 'PC Case', 'case'],
]

export default function PCBuilder() {
    const { add } = useCart()
    const [apiProducts, setApiProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [apiError, setApiError] = useState('')
    const [selected, setSelected] = useState({})
    const [warnings, setWarnings] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [checking, setChecking] = useState(false)
    const [saving, setSaving] = useState(false)
    const [adding, setAdding] = useState(false)
    const [buildName, setBuildName] = useState('My Gaming PC')
    const [message, setMessage] = useState('')

    useEffect(() => {
        let active = true
        apiRequest('/builder/components')
            .then((result) => {
                if (!active) return
                const products = (result.data || []).map(normalizeProduct)
                setApiProducts(products)
                setSelected(Object.fromEntries(slots.map(([key, , cat]) => [
                    key,
                    products.find((product) => product.cat === cat && Number(product.stock) > 0)?.id || '',
                ])))
            })
            .catch((error) => {
                if (active) setApiError(error.message || 'Unable to connect to backend.')
            })
            .finally(() => {
                if (active) setLoading(false)
            })
        return () => { active = false }
    }, [])

    const chosen = useMemo(() => slots.map(([key, label, cat]) => ({
        key,
        label,
        category: cat,
        product: apiProducts.find((item) => item.cat === cat && String(item.id) === String(selected[key])) || null,
    })), [apiProducts, selected])

    const total = chosen.reduce((sum, item) => sum + Number(item.product?.price || 0), 0)

    const handleChange = (key, value) => {
        setSelected((previous) => ({ ...previous, [key]: value }))
        setWarnings([])
        setSuggestions([])
        setMessage('')
    }

    const selectedProducts = chosen.filter(({ product }) => product)
    const componentIds = selectedProducts.map(({ product }) => Number(product.id))

    const checkCompatibility = async () => {
        setChecking(true)
        setMessage('')
        try {
            const components = Object.fromEntries(selectedProducts.map(({ key, product }) => [key, product.id]))
            const result = await apiRequest('/builder/check-compatibility', {
                method: 'POST',
                body: JSON.stringify({ components }),
            })
            setWarnings(result.warnings || [])
            setSuggestions(result.suggestions || [])
            if (!(result.warnings || []).length) setMessage('All selected components are compatible.')
        } catch (error) {
            setMessage(error.message || 'Compatibility check failed.')
        } finally {
            setChecking(false)
        }
    }

    const addBuildToBag = async () => {
        if (!selectedProducts.length) return setMessage('Select at least one component first.')
        setAdding(true)
        setMessage('')
        try {
            await Promise.all(selectedProducts.map(({ product }) => add(product.id)))
            setMessage(`${selectedProducts.length} components added to your bag.`)
        } catch (error) {
            setMessage(error.message || 'Unable to add this build to your bag.')
        } finally {
            setAdding(false)
        }
    }

    const saveBuild = async () => {
        const userId = getUserId()
        if (!userId) {
            setMessage('Please log in before saving a build.')
            return
        }
        setSaving(true)
        setMessage('')
        try {
            const result = await apiRequest('/builder/save', {
                method: 'POST',
                body: JSON.stringify({ userId, buildName, componentIds }),
            })
            setMessage(`Build saved. Build ID: ${result.data.buildId}`)
        } catch (error) {
            setWarnings(error.warnings || [])
            setSuggestions(error.suggestions || [])
            setMessage(error.message || 'Failed to save PC build.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <section className="sec builder-page">
                <div className="sh"><div><p className="kicker">CUSTOM CONFIGURATOR</p><h1>Build your own rig.</h1><p className="lead">Loading components from server...</p></div></div>
            </section>
        )
    }

    if (apiError && !apiProducts.length) {
        return (
            <section className="sec builder-page">
                <div className="panel"><p className="kicker">API ERROR</p><h2>Backend connection failed</h2><p role="alert">{apiError}</p><button className="btn" onClick={() => window.location.reload()}>Retry</button></div>
            </section>
        )
    }

    return (
        <section className="sec builder-page">
            <div className="sh">
                <div>
                    <p className="kicker">CUSTOM CONFIGURATOR</p>
                    <h1>Build your own rig.</h1>
                    <p className="lead">Choose components and check compatibility before saving or adding your build to the bag.</p>
                </div>
                <Link className="btn ghost" to="/products">Browse components</Link>
            </div>

            <div className="builder-api-status">
                <span>● Backend Connected</span>
                <span>{apiProducts.length} products loaded</span>
            </div>

            <div className="builder-layout">
                <div className="builder-slots">
                    {chosen.map(({ key, label, category, product }) => {
                        const available = apiProducts.filter((item) => item.cat === category && Number(item.stock) > 0)
                        return (
                            <label className="slot" key={key}>
                                <span>{label}</span>
                                <div className="slot-control">
                                    <div className="slot-image-wrap">
                                        {product ? <ProductImage p={product} className="slot-image" /> : <div className="slot-image">No product in stock</div>}
                                    </div>
                                    <select value={selected[key] || ''} onChange={(event) => handleChange(key, event.target.value)}>
                                        <option value="">Select {label}</option>
                                        {available.map((item) => <option key={item.id} value={item.id}>{item.name} — {formatPrice(item.price)}</option>)}
                                    </select>
                                </div>
                            </label>
                        )
                    })}
                </div>

                <aside className="panel builder-summary">
                    <p className="kicker">BUILD PREVIEW</p>
                    <div className="builder-preview-grid">
                        {chosen.map(({ key, product }) => <div key={key}>{product ? <ProductImage p={product} /> : <div className="slot-image">—</div>}</div>)}
                    </div>

                    <div className="build-summary-list">
                        {selectedProducts.map(({ key, label, product }) => (
                            <div className="summary-row" key={key}>
                                <span>{label}: {product.name}</span>
                                <strong>{formatPrice(product.price)}</strong>
                            </div>
                        ))}
                        {!selectedProducts.length && <p className="mute">Choose components to see the build summary.</p>}
                    </div>

                    <ul className="checks">
                        {warnings.map((warning) => <li key={warning} className="warn">⚠ {warning}</li>)}
                        {suggestions.map((suggestion) => <li key={suggestion} className="ok">✓ {suggestion}</li>)}
                        {!warnings.length && !suggestions.length && <li className="ok">Check your selected components for compatibility.</li>}
                    </ul>

                    {message && <p className="builder-message" role="status">{message}</p>}
                    <label className="build-name-field">Build name<input value={buildName} maxLength={255} onChange={(event) => setBuildName(event.target.value)} /></label>
                    <div className="total"><span>Estimated total</span><b>{formatPrice(total)}</b></div>
                    <button className="btn" onClick={checkCompatibility} disabled={checking || !selectedProducts.length}>{checking ? 'Checking...' : 'Check Compatibility'}</button>
                    <button className="btn" onClick={addBuildToBag} disabled={adding || !selectedProducts.length}>{adding ? 'Adding...' : 'Add build to bag'}</button>
                    <button className="btn ghost" onClick={saveBuild} disabled={saving || !selectedProducts.length}>{saving ? 'Saving...' : 'Save PC Build'}</button>
                </aside>
            </div>
        </section>
    )
}
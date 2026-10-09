const DEFAULT_API_BASE = import.meta.env.PROD
    ? 'https://cyberflix-pc-2.onrender.com/api'
    : '/api'
const API_BASE = (import.meta.env.VITE_API_URL || DEFAULT_API_BASE).replace(/\/+$/, '')

export async function apiRequest(path, options = {}) {
    let response

    try {
        response = await fetch(`${API_BASE}${path}`, {
            ...options,
            headers: {
                ...(options.body ? { 'Content-Type': 'application/json' } : {}),
                ...options.headers,
            },
        })
    } catch {
        throw new Error('Cannot reach the backend. Start the API server and try again.')
    }

    const result = await response.json().catch(() => ({}))
    if (!response.ok || result.success === false) {
        const error = new Error(result.message || `Request failed (${response.status})`)
        error.warnings = result.warnings || []
        error.suggestions = result.suggestions || []
        error.status = response.status
        throw error
    }

    return result
}

export function resolveImageUrl(image) {
    const source = String(image || '').trim()
    if (!source) return ''
    if (/^(https?:|data:|blob:|\/\/)/i.test(source)) return source

    const imagePath = `/${source.replace(/^\/+/, '')}`
    if (imagePath.startsWith('/uploads/') && /^https?:\/\//i.test(API_BASE)) {
        return `${new URL(API_BASE).origin}${imagePath}`
    }

    return imagePath
}

const categoryIds = {
    cpu: 'cpu',
    processor: 'cpu',
    gpu: 'gpu',
    'gpu / graphics card': 'gpu',
    'graphics card': 'gpu',
    motherboard: 'motherboard',
    motherboards: 'motherboard',
    ram: 'ram',
    'ssd / hdd': 'storage',
    storage: 'storage',
    psu: 'psu',
    'power supply': 'psu',
    'power supplies': 'psu',
    case: 'case',
    'pc case': 'case',
    cooler: 'cooler',
    'cpu cooler': 'cooler',
    cooling: 'cooler',
    fans: 'fans',
    monitors: 'monitors',
    accessories: 'accessories',
    'other pc accessories': 'accessories',
}

export function normalizeProduct(product) {
    const category = String(product.category_name || product.category || '').trim()
    const cat = categoryIds[category.toLowerCase()] || 'accessories'
    const details = [
        product.brand,
        product.socket,
        product.ram_type,
        product.form_factor,
        product.wattage ? `${product.wattage} W` : null,
    ].filter(Boolean)

    return {
        ...product,
        id: product.id,
        cat,
        name: product.name || 'Unnamed component',
        price: Number(product.price) || 0,
        rating: Number(product.rating) || 4.5,
        reviews: Number(product.reviews) || 0,
        spec: product.description || details.join(' · ') || category || 'PC component',
        img: product.image || product.img || '',
        c: {
            socket: product.socket || null,
            ddr: product.ram_type || null,
            watts: product.wattage || null,
            requiredWattage: product.required_wattage || null,
            form: product.form_factor || null,
        },
    }
}

export { API_BASE }
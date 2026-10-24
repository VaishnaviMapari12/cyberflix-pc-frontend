// const DEFAULT_API_BASE = import.meta.env.PROD
//     ? 'https://cyberflix-pc-2.onrender.com/api'
//     : '/api'
// const API_BASE = (
//     import.meta.env.DEV
//         ? '/api'
//         : import.meta.env.VITE_API_URL || DEFAULT_API_BASE
// ).replace(/\/+$/, '')

// export async function apiRequest(path, options = {}) {
//     let response

//     try {
//         response = await fetch(`${API_BASE}${path}`, {
//             ...options,
//             headers: {
//                 ...(options.body ? { 'Content-Type': 'application/json' } : {}),
//                 ...options.headers,
//             },
//         })
//     } catch {
//         throw new Error('Cannot reach the backend. Start the API server and try again.')
//     }

//     const body = await response.text()
//     let result

//     try {
//         result = body ? JSON.parse(body) : {}
//     } catch {
//         const message = response.status >= 500
//             ? 'Store service is temporarily unavailable. Please try again later.'
//             : 'The backend returned an invalid response. Check the API URL and try again.'
//         const error = new Error(message)
//         error.status = response.status
//         throw error
//     }

//     if (!response.ok || result.success === false) {
//         const message = response.status >= 500
//             ? 'Store service is temporarily unavailable. Please try again later.'
//             : result.message || `Request failed (${response.status})`
//         const error = new Error(message)
//         error.warnings = result.warnings || []
//         error.suggestions = result.suggestions || []
//         error.status = response.status
//         throw error
//     }

//     return result
// }

// export function resolveImageUrl(image) {
//     const source = String(image || '').trim()
//     if (!source) return ''
//     if (/^(https?:|data:|blob:|\/\/)/i.test(source)) return source

//     const imagePath = `/${source.replace(/^\/+/, '')}`
//     if (imagePath.startsWith('/uploads/') && /^https?:\/\//i.test(API_BASE)) {
//         return `${new URL(API_BASE).origin}${imagePath}`
//     }

//     return imagePath
// }

// const categoryIds = {
//     cpu: 'cpu',
//     processor: 'cpu',
//     gpu: 'gpu',
//     'gpu / graphics card': 'gpu',
//     'graphics card': 'gpu',
//     motherboard: 'motherboard',
//     motherboards: 'motherboard',
//     ram: 'ram',
//     'ssd / hdd': 'storage',
//     storage: 'storage',
//     psu: 'psu',
//     'power supply': 'psu',
//     'power supplies': 'psu',
//     case: 'case',
//     'pc case': 'case',
//     cooler: 'cooler',
//     'cpu cooler': 'cooler',
//     cooling: 'cooler',
//     fans: 'fans',
//     monitors: 'monitors',
//     accessories: 'accessories',
//     'other pc accessories': 'accessories',
// }

// export function normalizeProduct(product) {
//     const category = String(product.category_name || product.category || '').trim()
//     const cat = categoryIds[category.toLowerCase()] || 'accessories'
//     const details = [
//         product.brand,
//         product.socket,
//         product.ram_type,
//         product.form_factor,
//         product.wattage ? `${product.wattage} W` : null,
//     ].filter(Boolean)

//     return {
//         ...product,
//         id: product.id,
//         cat,
//         name: product.name || 'Unnamed component',
//         price: Number(product.price) || 0,
//         rating: product.rating == null ? null : Number(product.rating),
//         reviews: product.reviews == null ? null : Number(product.reviews),
//         spec: product.description || details.join(' · ') || category || 'PC component',
//         img: product.image || product.img || '',
//         c: {
//             socket: product.socket || null,
//             ddr: product.ram_type || null,
//             watts: product.wattage || null,
//             requiredWattage: product.required_wattage || null,
//             form: product.form_factor || null,
//         },
//     }
// }

// export { API_BASE }



const DEFAULT_API_BASE = 'https://cyberflix-pc-3.onrender.com/api';

const API_BASE = (
    import.meta.env.DEV
        ? '/api'
        : import.meta.env.VITE_API_URL || DEFAULT_API_BASE
).replace(/\/+$/, '');

export async function apiRequest(path, options = {}) {
    let response;

    try {
        const normalizedPath = path.startsWith('/')
            ? path
            : `/${path}`;

        response = await fetch(`${API_BASE}${normalizedPath}`, {
            ...options,
            headers: {
                ...(options.body
                    ? { 'Content-Type': 'application/json' }
                    : {}),
                ...options.headers,
            },
        });
    } catch (err) {
        console.error('API connection error:', err);
        throw new Error(
            'Cannot reach the backend. Check your internet connection and API configuration.'
        );
    }

    const body = await response.text();
    let result;

    try {
        result = body ? JSON.parse(body) : {};
    } catch {
        const message = response.status >= 500
            ? 'Store service is temporarily unavailable. Please try again later.'
            : 'The backend returned an invalid response. Check the API URL and try again.';

        const error = new Error(message);
        error.status = response.status;
        throw error;
    }

    if (!response.ok || result.success === false) {
        const message = response.status >= 500
            ? 'Store service is temporarily unavailable. Please try again later.'
            : result.message || `Request failed (${response.status})`;

        const error = new Error(message);
        error.warnings = result.warnings || [];
        error.suggestions = result.suggestions || [];
        error.status = response.status;
        throw error;
    }

    return result;
}

export function resolveImageUrl(image) {
    const source = String(image || '').trim();

    if (!source) return '';

    // Keep absolute URLs and embedded image data unchanged.
    if (/^(https?:|data:|blob:|\/\/)/i.test(source)) {
        return source;
    }

    const imagePath = `/${source.replace(/^\/+/, '')}`;

    // Uploaded images are served from the backend origin.
    if (
        imagePath.startsWith('/uploads/') &&
        /^https?:\/\//i.test(API_BASE)
    ) {
        return `${new URL(API_BASE).origin}${imagePath}`;
    }

    return imagePath;
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
};

export function normalizeProduct(product) {
    const category = String(
        product.category_name || product.category || ''
    ).trim();

    const cat = categoryIds[category.toLowerCase()] || 'accessories';

    const details = [
        product.brand,
        product.socket,
        product.ram_type,
        product.form_factor,
        product.wattage ? `${product.wattage} W` : null,
    ].filter(Boolean);

    return {
        ...product,
        id: product.id,
        cat,
        name: product.name || 'Unnamed component',
        price: Number(product.price) || 0,
        rating: product.rating == null
            ? null
            : Number(product.rating),
        reviews: product.reviews == null
            ? null
            : Number(product.reviews),
        spec:
            product.description ||
            details.join(' · ') ||
            category ||
            'PC component',
        img: resolveImageUrl(product.image || product.img || ''),
        c: {
            socket: product.socket || null,
            ddr: product.ram_type || null,
            watts: product.wattage || null,
            requiredWattage: product.required_wattage || null,
            form: product.form_factor || null,
        },
    };
}

export { API_BASE };

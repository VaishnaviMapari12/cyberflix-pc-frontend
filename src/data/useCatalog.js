

import { useCallback, useEffect, useState } from 'react'
import { apiRequest } from './api.js'
import { categories as staticCategories } from './products.js'

const categoryMap = {
    'CPU': 'cpu',
    'GPU / Graphics Card': 'gpu',
    'Motherboard': 'motherboard',
    'RAM': 'ram',
    'SSD / HDD': 'storage',
    'PSU': 'psu',
    'PC Case': 'case',
    'CPU Cooler': 'cooler',
    'Fans': 'fans',
    'Monitors': 'monitors',
    'Other PC Accessories': 'accessories',
    'Accessories': 'accessories'
}

export function useCatalog() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // ==============================
    // LOAD PRODUCTS
    // ==============================

    const loadProducts = useCallback(async () => {
        try {
            const result = await apiRequest('/products')

            if (!result.success) {
                throw new Error(
                    result.message ||
                    'Failed to load products'
                )
            }

            const apiProducts = result.data || []

            const formattedProducts = apiProducts.map(
                (item) => ({
                    id: item.id,

                    name: item.name,

                    category_id:
                        item.category_id,

                    category:
                        item.category || '',

                    cat:
                        categoryMap[
                        item.category
                        ] ||
                        categoryMap[
                        item.category_name
                        ] ||
                        'accessories',

                    price: Number(
                        item.price || 0
                    ),

                    rating: item.rating == null ? null : Number(item.rating),

                    reviews: item.reviews == null ? null : Number(item.reviews),

                    brand:
                        item.brand || '',

                    description:
                        item.description || '',

                    image:
                        item.image || '',

                    img:
                        item.image || '',

                    spec:
                        item.description ||
                        item.brand ||
                        'PC Component',

                    stock: Number(
                        item.stock || 0
                    ),

                    c: {
                        socket:
                            item.socket || null,

                        ddr:
                            item.ram_type || null,

                        watts:
                            item.wattage || null,

                        requiredWattage:
                            item.required_wattage ||
                            null,

                        supportedSocket:
                            item.supported_socket ||
                            null,

                        form:
                            item.form_factor ||
                            null,

                        supportedFormFactor:
                            item.supported_form_factor ||
                            null
                    }
                })
            )

            setProducts(formattedProducts)

        } catch (err) {
            console.warn('Products unavailable:', err.message)

            throw err
        }
    }, [])

    // ==============================
    // LOAD CATEGORIES
    // ==============================

    const loadCategories = useCallback(async () => {
        try {
            const result = await apiRequest('/categories')

            if (!result.success) {
                throw new Error(
                    result.message ||
                    'Failed to load categories'
                )
            }

            const apiCategories =
                result.data || []

            const formattedCategories =
                apiCategories.map(
                    (item) => {
                        const cat = categoryMap[item.name] || 'accessories'
                        const presentation = staticCategories.find(
                            (category) => category.id === cat
                        )

                        return {
                            ...presentation,
                            id: cat,
                            name: item.name,
                            image: item.image || presentation?.image || '',
                            cat,
                        }
                    }
                )

            setCategories(
                formattedCategories
            )

        } catch (err) {
            console.warn('Categories unavailable:', err.message)

            throw err
        }
    }, [])

    // ==============================
    // LOAD EVERYTHING
    // ==============================

    const loadCatalog = useCallback(
        async () => {
            setLoading(true)
            setError('')

            const [productsResult, categoriesResult] = await Promise.allSettled([
                loadProducts(),
                loadCategories()
            ])
            const errors = []

            if (productsResult.status === 'rejected') {
                setProducts([])
                errors.push(productsResult.reason.message || 'Unable to load products.')
            }

            if (categoriesResult.status === 'rejected') {
                setCategories([])
                errors.push(categoriesResult.reason.message || 'Unable to load categories.')
            }

            setError(errors.join(' '))
            setLoading(false)
        },
        [
            loadProducts,
            loadCategories
        ]
    )

    // ==============================
    // INITIAL LOAD
    // ==============================

    useEffect(() => {
        const request = window.setTimeout(() => { void loadCatalog() }, 0)
        return () => window.clearTimeout(request)
    }, [loadCatalog])

    return {
        products,
        categories,
        loading,
        error,
        retry: loadCatalog
    }
}

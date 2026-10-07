// import { useCallback, useEffect, useState } from 'react'

// const API_URL = 'http://localhost:5000/api'

// const categoryMap = {
//     'CPU': 'cpu',
//     'GPU / Graphics Card': 'gpu',
//     'Motherboard': 'motherboard',
//     'RAM': 'ram',
//     'SSD / HDD': 'storage',
//     'PSU': 'psu',
//     'PC Case': 'case',
//     'CPU Cooler': 'cooler',
//     'Fans': 'fans',
//     'Monitors': 'monitors',
//     'Other PC Accessories': 'accessories',
//     'Accessories': 'accessories'
// }

// export function useCatalog() {

//     const [products, setProducts] =
//         useState([])

//     const [loading, setLoading] =
//         useState(true)

//     const [error, setError] =
//         useState('')

//     const loadProducts = useCallback(
//         async () => {

//             try {

//                 setLoading(true)
//                 setError('')

//                 const response =
//                     await fetch(
//                         `${API_URL}/products`
//                     )

//                 if (!response.ok) {
//                     throw new Error(
//                         `Backend error: ${response.status}`
//                     )
//                 }

//                 const result =
//                     await response.json()

//                 if (!result.success) {
//                     throw new Error(
//                         result.message ||
//                         'Failed to load products'
//                     )
//                 }

//                 const apiProducts =
//                     result.data || []

//                 const formattedProducts =
//                     apiProducts.map(
//                         (item) => ({

//                             id: item.id,

//                             name: item.name,

//                             cat:
//                                 categoryMap[
//                                 item.category_name
//                                 ] ||
//                                 categoryMap[
//                                 item.category
//                                 ] ||
//                                 'accessories',

//                             price:
//                                 Number(
//                                     item.price || 0
//                                 ),

//                             rating: 4.5,

//                             reviews: 0,

//                             brand:
//                                 item.brand || '',

//                             description:
//                                 item.description ||
//                                 '',

//                             image:
//                                 item.image ||
//                                 '',

//                             img:
//                                 item.image ||
//                                 '',

//                             spec:
//                                 item.description ||
//                                 item.brand ||
//                                 'PC Component',

//                             stock:
//                                 Number(
//                                     item.stock || 0
//                                 ),

//                             c: {

//                                 socket:
//                                     item.socket,

//                                 ddr:
//                                     item.ram_type,

//                                 watts:
//                                     item.wattage,

//                                 requiredWattage:
//                                     item.required_wattage,

//                                 supportedSocket:
//                                     item.supported_socket,

//                                 form:
//                                     item.form_factor,

//                                 supportedFormFactor:
//                                     item.supported_form_factor

//                             }

//                         })
//                     )

//                 setProducts(
//                     formattedProducts
//                 )

//             } catch (err) {

//                 console.error(
//                     'Catalog API Error:',
//                     err
//                 )

//                 setError(
//                     err.message ||
//                     'Unable to connect to backend.'
//                 )

//                 setProducts([])

//             } finally {

//                 setLoading(false)

//             }

//         },
//         []
//     )

//     useEffect(() => {
//         loadProducts()
//     }, [loadProducts])

//     return {
//         products,
//         loading,
//         error,
//         retry: loadProducts
//     }
// }




import { useCallback, useEffect, useState } from 'react'
import { API_BASE } from './api.js'
import { categories as staticCategories, products as staticProducts } from './products.js'

const API_URL = API_BASE

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
            const response = await fetch(
                `${API_URL}/products`
            )

            if (!response.ok) {
                throw new Error(
                    `Products API error: ${response.status}`
                )
            }

            const result = await response.json()

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

                    rating: 4.5,

                    reviews: 0,

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
            console.error(
                'Products API Error:',
                err
            )

            throw err
        }
    }, [])

    // ==============================
    // LOAD CATEGORIES
    // ==============================

    const loadCategories = useCallback(async () => {
        try {
            const response = await fetch(
                `${API_URL}/categories`
            )

            if (!response.ok) {
                throw new Error(
                    `Categories API error: ${response.status}`
                )
            }

            const result = await response.json()

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
            console.error(
                'Categories API Error:',
                err
            )

            throw err
        }
    }, [])

    // ==============================
    // LOAD EVERYTHING
    // ==============================

    const loadCatalog = useCallback(
        async () => {
            try {
                setLoading(true)
                setError('')

                await Promise.all([
                    loadProducts(),
                    loadCategories()
                ])

            } catch (err) {
                setProducts(staticProducts)
                setCategories(staticCategories)
                setError(
                    err.message ||
                    'Unable to connect to backend.'
                )

            } finally {
                setLoading(false)
            }
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

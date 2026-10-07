import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/Productcard.jsx'
import ProductImage from '../components/ProductImage.jsx'
import { categories, products as staticProducts } from '../data/products.js'
import { useCatalog } from '../data/useCatalog.js'

export default function Products() {
    const { products: catalogProducts, loading, error } = useCatalog()
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState('')
    const [sort, setSort] = useState('')
    const categoryId = searchParams.get('cat') || 'all'
    const selectedCategory = categories.find((category) => category.id === categoryId)
    const allProducts = catalogProducts.length ? catalogProducts : staticProducts

    const visibleProducts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()
        const filtered = allProducts.filter((product) => {
            const matchesCategory = categoryId === 'all' || product.cat === categoryId
            const matchesQuery = `${product.name} ${product.brand || ''} ${product.spec || ''}`
                .toLowerCase()
                .includes(normalizedQuery)
            return matchesCategory && matchesQuery
        })

        if (sort === 'lo') return filtered.sort((a, b) => a.price - b.price)
        if (sort === 'hi') return filtered.sort((a, b) => b.price - a.price)
        if (sort === 'rt') return filtered.sort((a, b) => b.rating - a.rating)
        return filtered
    }, [allProducts, categoryId, query, sort])

    const selectCategory = (id) => {
        setSearchParams(id === 'all' ? {} : { cat: id })
    }

    return (
        <section className="sec components-page">
            <header className="components-heading">
                <div>
                    <p className="kicker">CYBERFLIX / COMPONENTS</p>
                    <h1>{selectedCategory ? selectedCategory.name : 'Find your next upgrade.'}</h1>
                    <p className="components-intro">
                        Explore thoughtfully selected PC hardware, compare the details, and find the right fit for your build.
                    </p>
                </div>
                <Link className="btn components-builder-link" to="/builder">
                    Build a PC <span aria-hidden="true">↗</span>
                </Link>
            </header>

            <div className="components-overview" aria-live="polite">
                <div>
                    <span className="components-overview__label">The component collection</span>
                    <strong>{loading ? '…' : visibleProducts.length}</strong>
                    <span className="mute">{visibleProducts.length === 1 ? 'matching component' : 'matching components'}</span>
                </div>
                <ProductImage cat={selectedCategory?.id || 'gpu'} className="components-overview__image" />
                <span className="components-overview__note">Built for performance. Chosen for compatibility.</span>
            </div>

            {error && (
                <div className="catalog-error components-error" role="status">
                    <p>{error} Showing our curated catalog instead.</p>
                </div>
            )}

            <div className="components-layout">
                <aside className="components-sidebar" aria-label="Filter components by category">
                    <div className="components-sidebar__heading">
                        <h2>Categories</h2>
                        <span>{categories.length}</span>
                    </div>
                    <nav className="component-categories">
                        <button
                            className={categoryId === 'all' ? 'component-category is-active' : 'component-category'}
                            onClick={() => selectCategory('all')}
                            aria-pressed={categoryId === 'all'}
                        >
                            <span><span className="component-category__icon">✦</span> All components</span>
                            <span className="component-category__count">{allProducts.length}</span>
                        </button>
                        {categories.map((category) => {
                            const count = allProducts.filter((product) => product.cat === category.id).length
                            const active = categoryId === category.id
                            return (
                                <button
                                    key={category.id}
                                    className={active ? 'component-category is-active' : 'component-category'}
                                    onClick={() => selectCategory(category.id)}
                                    aria-pressed={active}
                                >
                                    <span>
                                        <span className="component-category__icon" aria-hidden="true">{category.icon}</span>
                                        {category.name}
                                    </span>
                                    <span className="component-category__count">{count}</span>
                                </button>
                            )
                        })}
                    </nav>
                </aside>

                <div className="components-results">
                    <div className="components-toolbar">
                        <label className="components-search">
                            <span className="components-search__icon" aria-hidden="true">⌕</span>
                            <span className="sr-only">Search components</span>
                            <input
                                type="search"
                                placeholder="Search by name, brand, or spec"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                        </label>
                        <label className="components-sort">
                            <span>Sort by</span>
                            <select value={sort} onChange={(event) => setSort(event.target.value)}>
                                <option value="">Featured</option>
                                <option value="rt">Top rated</option>
                                <option value="lo">Price: low to high</option>
                                <option value="hi">Price: high to low</option>
                            </select>
                        </label>
                    </div>

                    {loading ? (
                        <div className="components-loading" role="status">Loading components…</div>
                    ) : visibleProducts.length ? (
                        <div className="grid components-grid">
                            {visibleProducts.map((product) => <ProductCard key={product.id} p={product} />)}
                        </div>
                    ) : (
                        <div className="components-empty">
                            <span aria-hidden="true">⌕</span>
                            <h2>No components found</h2>
                            <p className="mute">Try a different search or clear your filters to see the full collection.</p>
                            <button
                                className="btn ghost"
                                onClick={() => {
                                    setQuery('')
                                    setSort('')
                                    selectCategory('all')
                                }}
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

// import { Link } from 'react-router-dom'
// import ProductImage, { Rig } from '../components/ProductImage.jsx'
// import CategoryCard from '../components/CategoryCard.jsx'
// import ProductCard from '../components/Productcard.jsx'
// import { categories, products } from '../data/products.js'

// const words = ['NEW ARRIVALS', 'CURATED FOR CREATORS', 'READY WHEN YOU ARE', 'NEW ARRIVALS']
// const get = (id) => products.find((p) => p.id === id)

// export default function Home() {
//     const featured = ['cpu3', 'gpu3', 'ram1', 'ssd1', 'mb1', 'cool1', 'mon1', 'psu1'].map(get)

//     return (
//         <>
//             <section className="hero">
//                 <div>
//                     <p className="kicker">ENGINEERED FOR YOUR NEXT LEVEL</p>
//                     <h1>Build a machine<br />worth staring at.</h1>
//                     <p className="lead">Premium components. Smarter compatibility. A setup that performs as good as it looks.</p>
//                     <div className="row">
//                         <Link className="btn" to="/builder">Start building ↗</Link>
//                         <Link className="btn ghost" to="/products">Browse components →</Link>
//                     </div>
//                     <div className="feats">
//                         <div><b>01</b><span>Curated hardware</span><small>Tested in the real world</small></div>
//                         <div><b>02</b><span>Human support</span><small>Here when you need us</small></div>
//                     </div>
//                 </div>

//                 <div className="stage">
//                     <Rig />
//                     <div className="float f1">
//                         <ProductImage p={get('cpu3')} className="mini" />
//                         <div><small>CF / 01 ✦✦</small><b>RYZEN 7800X3D</b></div>
//                     </div>
//                     <div className="float f2">
//                         <ProductImage p={get('gpu3')} className="mini" />
//                         <div><small>PERFORMANCE DIVISION</small><b>RTX 4070 SUPER</b></div>
//                     </div>
//                 </div>
//             </section>

//             <div className="marquee" aria-hidden="true">
//                 <div className="track">
//                     {[...words, ...words].map((w, i) => <span key={i}>{w}<i>///</i></span>)}
//                 </div>
//             </div>

//             <section className="sec">
//                 <div className="sh">
//                     <div>
//                         <p className="kicker">01 / THE GOOD STUFF</p>
//                         <h2>Components with<br />a point of view.</h2>
//                     </div>
//                     <Link className="link" to="/products">See all components →</Link>
//                 </div>
//                 <div className="grid">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
//             </section>

//             <section className="sec banners">
//                 <Link to="/products?cat=gpu" className="banner">
//                     <div><p className="kicker">GRAPHICS CARDS</p><h3>Frames for days.</h3><span className="link">Shop GPUs →</span></div>
//                     <ProductImage p={get('gpu2')} />
//                 </Link>
//                 <Link to="/products?cat=monitors" className="banner">
//                     <div><p className="kicker">MONITORS</p><h3>See every detail.</h3><span className="link">Shop monitors →</span></div>
//                     <ProductImage p={get('mon1')} />
//                 </Link>
//             </section>

//             <section className="sec split">
//                 <div>
//                     <p className="kicker">02 / MAKE IT YOURS</p>
//                     <h2>Parts are good.<br />A complete build is better.</h2>
//                     <p className="lead">
//                         Tell us what you play, create, and obsess over. Our builder checks the details so you can focus on the fun part.
//                     </p>
//                     <Link className="btn" to="/builder">Open PC Builder ↗</Link>
//                 </div>
//                 <div className="collage">
//                     <ProductImage p={get('cpu1')} />
//                     <ProductImage p={get('gpu1')} />
//                     <ProductImage p={get('ram1')} />
//                     <ProductImage p={get('ssd1')} />
//                     <div className="cscard">
//                         <span className="kicker">COMPATIBILITY</span>
//                         <div className="score">98.4%</div>
//                         <p className="mute">Everything in this build plays nicely together.</p>
//                     </div>
//                 </div>
//             </section>

//             <section className="sec">
//                 <p className="kicker">03 / EXPLORE THE STACK</p>
//                 <h2>Start with<br />what you need.</h2>
//                 <div className="tiles">{categories.map((c) => <CategoryCard key={c.id} c={c} />)}</div>
//             </section>
//         </>
//     )
// }







import { Link } from 'react-router-dom'
import ProductImage, { Rig } from '../components/ProductImage.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import ProductCard from '../components/Productcard.jsx'
import { categories as staticCategories, products as staticProducts } from '../data/products.js'
import { useCatalog } from '../data/useCatalog.js'

const words = [
    'NEW ARRIVALS',
    'CURATED FOR CREATORS',
    'READY WHEN YOU ARE',
    'NEW ARRIVALS'
]

export default function Home() {
    const {
        products: catalogProducts = [],
        categories: catalogCategories = []
    } = useCatalog()

    // Backend products first, static products as fallback
    const products =
        catalogProducts.length > 0
            ? catalogProducts
            : staticProducts

    // Backend categories first, static categories as fallback
    const categories =
        catalogCategories.length > 0
            ? catalogCategories
            : staticCategories

    // Backend product IDs are numeric, so use available products safely
    const cpuProduct = products.find(
        (p) => p.category_id === 1 || p.category === 'CPU'
    )

    const gpuProduct = products.find(
        (p) =>
            p.category_id === 2 ||
            p.category === 'GPU / Graphics Card'
    )

    const ramProduct = products.find(
        (p) =>
            p.category_id === 4 ||
            p.category === 'RAM'
    )

    const storageProduct = products.find(
        (p) =>
            p.category_id === 5 ||
            p.category === 'SSD / HDD'
    )

    const monitorProduct = products.find(
        (p) =>
            p.category_id === 10 ||
            p.category === 'Monitors'
    )

    // Featured products
    const featured = products.slice(0, 8)

    return (
        <>
            {/* ================= HERO SECTION ================= */}
            <section className="hero">
                <div>
                    <p className="kicker">
                        ENGINEERED FOR YOUR NEXT LEVEL
                    </p>

                    <h1>
                        Build a machine
                        <br />
                        worth staring at.
                    </h1>

                    <p className="lead">
                        Premium components. Smarter compatibility. A setup
                        that performs as good as it looks.
                    </p>

                    <div className="row">
                        <Link className="btn" to="/builder">
                            Start building ↗
                        </Link>

                        <Link className="btn ghost" to="/products">
                            Browse components →
                        </Link>
                    </div>

                    <div className="feats">
                        <div>
                            <b>01</b>
                            <span>Curated hardware</span>
                            <small>Tested in the real world</small>
                        </div>

                        <div>
                            <b>02</b>
                            <span>Human support</span>
                            <small>Here when you need us</small>
                        </div>
                    </div>
                </div>

                {/* ================= HERO RIG ================= */}
                <div className="stage">
                    <Rig />

                    {cpuProduct && (
                        <div className="float f1">
                            <ProductImage
                                p={cpuProduct}
                                className="mini"
                            />

                            <div>
                                <small>CF / 01 ✦✦</small>
                                <b>
                                    {cpuProduct.name ||
                                        'PROCESSOR'}
                                </b>
                            </div>
                        </div>
                    )}

                    {gpuProduct && (
                        <div className="float f2">
                            <ProductImage
                                p={gpuProduct}
                                className="mini"
                            />

                            <div>
                                <small>
                                    PERFORMANCE DIVISION
                                </small>

                                <b>
                                    {gpuProduct.name ||
                                        'GRAPHICS CARD'}
                                </b>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ================= MARQUEE ================= */}
            <div className="marquee" aria-hidden="true">
                <div className="track">
                    {[...words, ...words].map((w, i) => (
                        <span key={`${w}-${i}`}>
                            {w}
                            <i>///</i>
                        </span>
                    ))}
                </div>
            </div>

            {/* ================= FEATURED PRODUCTS ================= */}
            <section className="sec">
                <div className="sh">
                    <div>
                        <p className="kicker">
                            01 / THE GOOD STUFF
                        </p>

                        <h2>
                            Components with
                            <br />
                            a point of view.
                        </h2>
                    </div>

                    <Link className="link" to="/products">
                        See all components →
                    </Link>
                </div>

                <div className="grid">
                    {featured.map((p) => (
                        <ProductCard
                            key={p.id}
                            p={p}
                        />
                    ))}
                </div>
            </section>

            {/* ================= BANNERS ================= */}
            <section className="sec banners">
                <Link
                    to="/products?cat=gpu"
                    className="banner"
                >
                    <div>
                        <p className="kicker">
                            GRAPHICS CARDS
                        </p>

                        <h3>
                            Frames for days.
                        </h3>

                        <span className="link">
                            Shop GPUs →
                        </span>
                    </div>

                    {gpuProduct && (
                        <ProductImage p={gpuProduct} />
                    )}
                </Link>

                <Link
                    to="/products?cat=monitors"
                    className="banner"
                >
                    <div>
                        <p className="kicker">
                            MONITORS
                        </p>

                        <h3>
                            See every detail.
                        </h3>

                        <span className="link">
                            Shop monitors →
                        </span>
                    </div>

                    {monitorProduct && (
                        <ProductImage p={monitorProduct} />
                    )}
                </Link>
            </section>

            {/* ================= PC BUILDER SECTION ================= */}
            <section className="sec split">
                <div>
                    <p className="kicker">
                        02 / MAKE IT YOURS
                    </p>

                    <h2>
                        Parts are good.
                        <br />
                        A complete build is better.
                    </h2>

                    <p className="lead">
                        Tell us what you play, create, and obsess over.
                        Our builder checks the details so you can focus
                        on the fun part.
                    </p>

                    <Link
                        className="btn"
                        to="/builder"
                    >
                        Open PC Builder ↗
                    </Link>
                </div>

                <div className="collage">
                    {cpuProduct && (
                        <ProductImage p={cpuProduct} />
                    )}

                    {gpuProduct && (
                        <ProductImage p={gpuProduct} />
                    )}

                    {ramProduct && (
                        <ProductImage p={ramProduct} />
                    )}

                    {storageProduct && (
                        <ProductImage p={storageProduct} />
                    )}

                    <div className="cscard">
                        <span className="kicker">
                            COMPATIBILITY
                        </span>

                        <div className="score">
                            98.4%
                        </div>

                        <p className="mute">
                            Everything in this build plays nicely
                            together.
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= CATEGORIES ================= */}
            <section className="sec">
                <p className="kicker">
                    03 / EXPLORE THE STACK
                </p>

                <h2>
                    Start with
                    <br />
                    what you need.
                </h2>

                <div className="tiles">
                    {categories.map((c) => (
                        <CategoryCard
                            key={c.id}
                            c={c}
                            products={products}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

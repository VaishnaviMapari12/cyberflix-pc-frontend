import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import PCBuilder from './pages/PCBuilder.jsx'
import Info from './pages/Info.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import OrderDetails from './pages/OrderDetails.jsx'
import Wishlist from './pages/Wishlist.jsx'

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/orders/:orderId" element={<OrderDetails />} />

          <Route
            path="/builder"
            element={<PCBuilder />}
          />

          <Route
            path="/pc-builder"
            element={<PCBuilder />}
          />

          <Route
            path="/info/:slug"
            element={<Info />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}
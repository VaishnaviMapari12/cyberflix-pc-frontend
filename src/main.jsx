import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './data/CartContext.jsx'
import { CatalogProvider } from './data/CatalogContext.jsx'
import WishlistProvider from './data/WishlistProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CatalogProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </CatalogProvider>
  </BrowserRouter>
)
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AdminProvider } from './context/AdminContext'
import { ProductProvider } from './context/ProductContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/common/WhatsAppButton'
import BackToTop from './components/common/BackToTop'
import ScrollProgress from './components/common/ScrollProgress'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Gallery from './pages/Gallery'
import CustomOrder from './pages/CustomOrder'
import About from './pages/About'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import AdminLayout from './components/admin/AdminLayout'
import AdminRoute from './components/admin/AdminRoute'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import OrderManagement from './pages/admin/OrderManagement'
import ProductManagement from './pages/admin/ProductManagement'
import CategoryManagement from './pages/admin/CategoryManagement'
import './admin.css'
import './admin-components.css'
import './admin-forms.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  if (isAdminRoute) {
    return (
      <ProductProvider>
        <AdminProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b',
                color: '#e2e8f0',
                fontFamily: '"DM Sans", sans-serif',
                borderRadius: '12px',
                padding: '14px 20px',
                border: '1px solid rgba(255,255,255,0.08)',
              },
            }}
          />
          <ScrollToTop />
          <Routes location={location}>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="categories" element={<CategoryManagement />} />
            </Route>
          </Routes>
        </AdminProvider>
      </ProductProvider>
    )
  }

  return (
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          <ScrollToTop />
        <ScrollProgress />
        <Navbar />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#2D6A4F',
              color: '#fff',
              fontFamily: '"DM Sans", sans-serif',
              borderRadius: '12px',
              padding: '14px 20px',
            },
          }}
        />
        <main className="min-h-screen">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/custom-order" element={<CustomOrder />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppButton />
          <BackToTop />
        </WishlistProvider>
      </CartProvider>
    </ProductProvider>
  )
}

export default App

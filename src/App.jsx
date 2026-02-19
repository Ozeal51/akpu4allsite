import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Admin from "./pages/Admin"
import { CartProvider } from "./context/CartContext"

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-cream-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </CartProvider>
  )
}

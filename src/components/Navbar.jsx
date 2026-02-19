import { Link, NavLink } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { asset } from "../utils/assets"

export default function Navbar() {
  const { items } = useCart()
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-brown-600/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={asset("logo.svg")} alt="Akpu4All" className="w-8 h-8 rounded-lg" />
          <span className="font-bold text-deepgreen-700 text-lg">Akpu4All</span>
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium ${isActive ? "text-deepgreen-700" : "text-brown-700 hover:text-deepgreen-700"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `text-sm font-medium ${isActive ? "text-deepgreen-700" : "text-brown-700 hover:text-deepgreen-700"}`
            }
          >
            Menu
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-sm font-medium ${isActive ? "text-deepgreen-700" : "text-brown-700 hover:text-deepgreen-700"}`
            }
          >
            Admin
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `text-sm font-medium flex items-center gap-2 ${isActive ? "text-deepgreen-700" : "text-brown-700 hover:text-deepgreen-700"}`
            }
          >
            Cart
            <span className="inline-flex items-center justify-center w-6 h-6 text-xs rounded-full bg-primary-500 text-white">
              {count}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

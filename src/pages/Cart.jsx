import { Link } from "react-router-dom"
import CartItem from "../components/CartItem"
import { useCart } from "../context/CartContext"
import { formatNaira } from "../utils/currency"

export default function Cart() {
  const { items, total, clear } = useCart()
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-deepgreen-700">Your Cart</h1>
      {items.length === 0 ? (
        <div className="mt-6 p-6 rounded-xl border border-brown-600/10 bg-white">
          <p className="text-sm text-brown-700">Your cart is empty.</p>
          <Link
            to="/menu"
            className="inline-block mt-4 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map((i) => (
              <CartItem key={i.id} item={i} />
            ))}
          </div>
          <div className="md:col-span-1 p-6 rounded-xl border border-brown-600/10 bg-white h-fit">
            <div className="flex items-center justify-between">
              <span className="text-brown-700">Total</span>
              <span className="font-semibold text-deepgreen-700">{formatNaira(total)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-4 block text-center px-4 py-2 rounded-lg bg-deepgreen-700 hover:bg-deepgreen-800 text-white"
            >
              Checkout
            </Link>
            <button
              onClick={clear}
              className="mt-3 w-full px-4 py-2 rounded-lg border border-brown-600/20 text-brown-700 hover:text-deepgreen-700"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

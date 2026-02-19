import { formatNaira } from "../utils/currency"
import { useCart } from "../context/CartContext"

export default function CartItem({ item }) {
  const { increment, decrement, removeItem } = useCart()
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-brown-600/10 bg-white">
      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-deepgreen-700">{item.name}</h4>
          <button
            onClick={() => removeItem(item.id)}
            className="text-sm text-brown-700 hover:text-deepgreen-700"
          >
            Remove
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => decrement(item.id)}
              className="w-8 h-8 rounded-full bg-cream-100 hover:bg-cream-50 border border-brown-600/20"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center">{item.qty}</span>
            <button
              onClick={() => increment(item.id)}
              className="w-8 h-8 rounded-full bg-primary-600 text-white hover:bg-primary-700"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <div className="font-semibold text-brown-700">
            {formatNaira(item.price * item.qty)}
          </div>
        </div>
      </div>
    </div>
  )
}

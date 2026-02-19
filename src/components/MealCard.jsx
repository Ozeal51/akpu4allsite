import { useCart } from "../context/CartContext"
import { formatNaira } from "../utils/currency"

export default function MealCard({ meal }) {
  const { addItem } = useCart()
  return (
    <div className="rounded-xl border border-brown-600/10 bg-white shadow-soft overflow-hidden card-hover">
      <img src={meal.image} alt={meal.name} className="w-full h-36 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-deepgreen-700">{meal.name}</h3>
        <p className="text-sm text-brown-700 mt-1">{meal.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-brown-700">{formatNaira(meal.price)}</span>
          <button
            onClick={() => addItem(meal)}
            className="px-4 py-2 text-sm rounded-lg bg-primary-600 hover:bg-primary-700 text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from "react"
import { getMeals } from "../utils/store"
import MealCard from "./MealCard"

export default function Featured() {
  const [list, setList] = useState([])
  useEffect(() => {
    setList(getMeals())
  }, [])
  const featured = list.slice(0, 4)
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-deepgreen-700">Featured Meals</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {featured.map((m) => (
          <MealCard key={m.id} meal={m} />
        ))}
      </div>
    </section>
  )
}

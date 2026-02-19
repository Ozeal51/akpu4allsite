import { useEffect, useMemo, useState } from "react"
import { categories } from "../data/meals"
import SearchBar from "../components/SearchBar"
import CategoryFilter from "../components/CategoryFilter"
import MealCard from "../components/MealCard"
import { getMeals } from "../utils/store"

export default function Menu() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [list, setList] = useState([])

  useEffect(() => {
    setList(getMeals())
  }, [])

  const filtered = useMemo(() => {
    return list.filter((m) => {
      const matchCategory = category ? m.category === category : true
      const q = search.trim().toLowerCase()
      const matchText = q
        ? m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
        : true
      return matchCategory && matchText
    })
  }, [search, category, list])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-deepgreen-700">Menu</h1>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-3">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter value={category} onChange={setCategory} options={categories} />
        </div>
        <div className="md:col-span-2">
          {filtered.length === 0 ? (
            <div className="text-brown-700 text-sm">No meals match your search.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((m) => (
                <MealCard key={m.id} meal={m} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

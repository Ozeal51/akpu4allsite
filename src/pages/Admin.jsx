import { useEffect, useMemo, useState } from "react"
import { categories } from "../data/meals"
import { getMeals, saveMeals, getOrders, updateOrderStatus } from "../utils/store"
import { formatNaira } from "../utils/currency"
import toast from "react-hot-toast"

export default function Admin() {
  const [tab, setTab] = useState("menu")
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-deepgreen-700">Admin</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTab("menu")}
            className={`px-3 py-1.5 rounded-lg text-sm ${tab === "menu" ? "bg-deepgreen-700 text-white" : "border border-brown-600/20 text-brown-700"}`}
          >
            Menu
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`px-3 py-1.5 rounded-lg text-sm ${tab === "orders" ? "bg-deepgreen-700 text-white" : "border border-brown-600/20 text-brown-700"}`}
          >
            Orders
          </button>
        </div>
      </div>
      {tab === "menu" ? <MenuAdmin /> : <OrdersAdmin />}
    </section>
  )
}

function MenuAdmin() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "swallow",
    image: ""
  })
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setList(getMeals())
  }, [])

  const reset = () =>
    setForm({ id: "", name: "", description: "", price: "", category: "swallow", image: "" })

  const submit = () => {
    if (!form.name || !form.description || !form.price || !form.image) {
      toast.error("Fill all fields")
      return
    }
    const priceNum = Number(form.price)
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      toast.error("Invalid price")
      return
    }
    if (editing) {
      const next = list.map((m) => (m.id === form.id ? { ...form, price: priceNum } : m))
      setList(next)
      saveMeals(next)
      toast.success("Meal updated")
    } else {
      const newItem = { ...form, id: form.id || form.name.toLowerCase().replace(/\s+/g, "-"), price: priceNum }
      const next = [newItem, ...list]
      setList(next)
      saveMeals(next)
      toast.success("Meal added")
    }
    setEditing(false)
    reset()
  }

  const edit = (m) => {
    setForm({ ...m, price: String(m.price) })
    setEditing(true)
  }

  const remove = (id) => {
    const next = list.filter((m) => m.id !== id)
    setList(next)
    saveMeals(next)
    toast.success("Meal removed")
  }

  return (
    <div className="mt-6 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1 p-6 rounded-xl border border-brown-600/10 bg-white space-y-3">
        <h3 className="font-semibold text-deepgreen-700">{editing ? "Edit Meal" : "Add Meal"}</h3>
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full rounded-lg border border-brown-600/20 px-4 py-2 text-sm"
          placeholder="Name"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="w-full rounded-lg border border-brown-600/20 px-4 py-2 text-sm"
          rows={3}
          placeholder="Description"
        />
        <input
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          className="w-full rounded-lg border border-brown-600/20 px-4 py-2 text-sm"
          placeholder="Price (₦)"
        />
        <select
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          className="w-full rounded-lg border border-brown-600/20 px-4 py-2 text-sm"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          value={form.image}
          onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
          className="w-full rounded-lg border border-brown-600/20 px-4 py-2 text-sm"
          placeholder="Image URL"
        />
        <div className="flex gap-2">
          <button onClick={submit} className="px-4 py-2 rounded-lg bg-deepgreen-700 text-white">
            {editing ? "Update" : "Add"}
          </button>
          <button onClick={() => { setEditing(false); reset() }} className="px-4 py-2 rounded-lg border border-brown-600/20 text-brown-700">
            Reset
          </button>
        </div>
      </div>
      <div className="md:col-span-2 space-y-4">
        {list.length === 0 ? (
          <div className="text-sm text-brown-700">No meals yet.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((m) => (
              <div key={m.id} className="rounded-xl border border-brown-600/10 bg-white shadow-soft overflow-hidden">
                <img src={m.image} alt={m.name} className="w-full h-32 object-cover" />
                <div className="p-4 space-y-2">
                  <div className="font-semibold text-deepgreen-700">{m.name}</div>
                  <div className="text-sm text-brown-700">{m.description}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-brown-700">{formatNaira(m.price)}</span>
                    <div className="flex gap-2">
                      <button onClick={() => edit(m)} className="px-3 py-1.5 text-sm rounded-lg border border-brown-600/20">Edit</button>
                      <button onClick={() => remove(m.id)} className="px-3 py-1.5 text-sm rounded-lg bg-primary-600 text-white">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function OrdersAdmin() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    setOrders(getOrders().reverse())
  }, [])

  const setStatus = (id, status) => {
    const updated = updateOrderStatus(id, status)
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)))
    toast.success(`Order ${status}`)
  }

  return (
    <div className="mt-6">
      {orders.length === 0 ? (
        <div className="text-sm text-brown-700">No orders yet.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="p-6 rounded-xl border border-brown-600/10 bg-white">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-deepgreen-700">{o.id}</div>
                <div className="text-sm">
                  <span className={`px-2 py-1 rounded-full ${o.status === "paid" ? "bg-deepgreen-700 text-white" : "bg-cream-100 text-brown-700"}`}>
                    {o.status}
                  </span>
                </div>
              </div>
              <div className="mt-3 grid sm:grid-cols-2 gap-4 text-sm text-brown-700">
                <div>
                  <div>{o.customer.name}</div>
                  <div>{o.customer.email}</div>
                  <div>{o.customer.phone}</div>
                  <div>{o.customer.address}</div>
                </div>
                <div>
                  <div>Payment: {o.payment}</div>
                  <div>Total: {formatNaira(o.total)}</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-brown-700">
                {o.items.map((i) => (
                  <div key={i.id} className="flex items-center justify-between">
                    <span>
                      {i.name} × {i.qty}
                    </span>
                    <span>{formatNaira(i.price * i.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setStatus(o.id, "fulfilled")} className="px-4 py-2 rounded-lg bg-deepgreen-700 text-white">
                  Fulfill
                </button>
                <button onClick={() => setStatus(o.id, "canceled")} className="px-4 py-2 rounded-lg border border-brown-600/20">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

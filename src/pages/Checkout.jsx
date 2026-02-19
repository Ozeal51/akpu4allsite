import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { formatNaira } from "../utils/currency"
import Spinner from "../components/Spinner"
import toast from "react-hot-toast"
import { saveOrder } from "../utils/store"

export default function Checkout() {
  const { items, total, clear } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "pod"
  })
  const [loading, setLoading] = useState(false)

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address || (form.payment === "card" && !form.email)) {
      toast.error("Please fill all customer details")
      return
    }
    const order = {
      id: `ORD-${Date.now()}`,
      customer: { name: form.name, email: form.email, phone: form.phone, address: form.address },
      payment: form.payment,
      items,
      total,
      status: form.payment === "card" ? "pending_payment" : "pending"
    }
    if (form.payment === "card") {
      try {
        const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY
        if (!publicKey) {
          toast.error("Missing Paystack public key. Set VITE_PAYSTACK_PUBLIC_KEY in .env")
          return
        }
        setLoading(true)
        const paystack = new window.PaystackPop()
        paystack.newTransaction({
          key: publicKey,
          amount: total * 100,
          email: form.email,
          onSuccess: (transaction) => {
            const completed = { ...order, status: "paid", reference: transaction.reference }
            saveOrder(completed)
            setLoading(false)
            clear()
            toast.success("Payment successful. Order placed!")
            navigate("/")
          },
          onCancel: () => {
            saveOrder(order)
            setLoading(false)
            toast.error("Payment canceled")
          }
        })
      } catch {
        setLoading(false)
        toast.error("Payment initialization failed")
      }
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    saveOrder(order)
    setLoading(false)
    clear()
    toast.success("Order placed successfully!")
    navigate("/")
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-deepgreen-700">Checkout</h1>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-xl border border-brown-600/10 bg-white space-y-4">
          <div>
            <label className="block text-sm text-brown-700">Full name</label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="mt-1 w-full rounded-lg border border-brown-600/20 px-4 py-2 text-sm"
              placeholder="E.g. Ngozi Okafor"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-brown-700">Email</label>
              <input
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="mt-1 w-full rounded-lg border border-brown-600/20 px-4 py-2 text-sm"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-sm text-brown-700">Phone number</label>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="mt-1 w-full rounded-lg border border-brown-600/20 px-4 py-2 text-sm"
                placeholder="+234..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-brown-700">Payment method</label>
            <select
              value={form.payment}
              onChange={(e) => update("payment", e.target.value)}
              className="mt-1 w-full rounded-lg border border-brown-600/20 px-4 py-2 text-sm"
            >
              <option value="pod">Pay on Delivery</option>
              <option value="card">Card</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-brown-700">Address</label>
            <textarea
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="mt-1 w-full rounded-lg border border-brown-600/20 px-4 py-2 text-sm"
              rows={3}
            />
          </div>
          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-3 rounded-lg bg-deepgreen-700 hover:bg-deepgreen-800 text-white disabled:opacity-70"
          >
            {loading ? <Spinner label="Placing order..." /> : "Place Order"}
          </button>
        </div>
        <div className="md:col-span-1 p-6 rounded-xl border border-brown-600/10 bg-white h-fit">
          <h3 className="font-semibold text-deepgreen-700">Order Summary</h3>
          <div className="mt-3 space-y-2">
            {items.map((i) => (
              <div key={i.id} className="flex items-center justify-between text-sm text-brown-700">
                <span>
                  {i.name} × {i.qty}
                </span>
                <span>{formatNaira(i.price * i.qty)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between font-semibold text-deepgreen-700 border-t border-brown-600/10 pt-3 mt-2">
              <span>Total</span>
              <span>{formatNaira(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

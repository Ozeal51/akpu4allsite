import { createContext, useContext, useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

const CartContext = createContext(null)

const STORAGE_KEY = "akpu4all_cart"

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id)
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        )
      }
      toast.success(`${product.name} added to cart`)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }

  const increment = (id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    )
  }

  const decrement = (id) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p))
        .filter((p) => p.qty > 0)
    )
  }

  const clear = () => setItems([])

  const total = useMemo(
    () => items.reduce((sum, p) => sum + p.price * p.qty, 0),
    [items]
  )

  const value = {
    items,
    addItem,
    removeItem,
    increment,
    decrement,
    clear,
    total
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}

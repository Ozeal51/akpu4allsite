import { meals as defaultMeals } from "../data/meals"

const MEALS_KEY = "akpu4all_meals"
const ORDERS_KEY = "akpu4all_orders"

export function getMeals() {
  try {
    const raw = localStorage.getItem(MEALS_KEY)
    return raw ? JSON.parse(raw) : defaultMeals
  } catch {
    return defaultMeals
  }
}

export function saveMeals(next) {
  localStorage.setItem(MEALS_KEY, JSON.stringify(next))
}

export function getOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveOrder(order) {
  const current = getOrders()
  const next = [...current, order]
  localStorage.setItem(ORDERS_KEY, JSON.stringify(next))
  return order
}

export function updateOrderStatus(id, status) {
  const current = getOrders()
  const next = current.map((o) => (o.id === id ? { ...o, status } : o))
  localStorage.setItem(ORDERS_KEY, JSON.stringify(next))
  return next.find((o) => o.id === id)
}

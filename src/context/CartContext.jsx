import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([
    { id: 999, name: 'Item Awal', price: 'Rp 0', qty: 3 },
  ])
  const [toast, setToast] = useState(null)

  const addToCart = useCallback((product) => {
    const normalizedProduct = {
      ...product,
      id: product?.id ?? `${product?.name ?? 'product'}-${product?.price ?? '0'}`,
    }

    setItems((prev) => {
      const existing = prev.find((it) => it.id === normalizedProduct.id)
      if (existing) {
        return prev.map((it) => (it.id === normalizedProduct.id ? { ...it, qty: it.qty + 1 } : it))
      }
      return [...prev, { ...normalizedProduct, qty: 1 }]
    })
    setToast(`${normalizedProduct.name} ditambahkan ke keranjang`)
    setTimeout(() => setToast(null), 2500)
  }, [])

  const totalQty = items.reduce((sum, it) => sum + it.qty, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, totalQty, toast }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

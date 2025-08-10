import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product, ProductVariant } from '@/types'
import toast from 'react-hot-toast'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, variant, quantity = 1) => {
        const existingItem = get().items.find(
          item => item.productId === product.id && item.variantId === variant.id
        )
        
        if (existingItem) {
          // Update quantity of existing item
          set(state => ({
            items: state.items.map(item =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          }))
          toast.success(`Updated ${product.name} quantity in cart`)
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${variant.id}`,
            productId: product.id,
            variantId: variant.id,
            quantity,
            product,
            variant
          }
          
          set(state => ({
            items: [...state.items, newItem]
          }))
          toast.success(`Added ${product.name} to cart`)
        }
      },
      
      removeItem: (itemId) => {
        const item = get().items.find(item => item.id === itemId)
        set(state => ({
          items: state.items.filter(item => item.id !== itemId)
        }))
        if (item) {
          toast.success(`Removed ${item.product.name} from cart`)
        }
      },
      
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        
        set(state => ({
          items: state.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          )
        }))
      },
      
      clearCart: () => {
        set({ items: [] })
        toast.success('Cart cleared')
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.basePrice + item.variant.priceAdjustment
          return total + (price * item.quantity)
        }, 0)
      },
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false })
    }),
    {
      name: 'cart-storage',
    }
  )
)
import { ref, computed, watch } from 'vue'
import type { Album } from '../types/album'
import type { CartItem } from '../types/cart'

const CART_STORAGE_KEY = 'album-cart'

// Global cart state
const cartItems = ref<CartItem[]>([])
const showCartModal = ref(false)
const notification = ref<{ message: string; visible: boolean }>({
  message: '',
  visible: false
})

// Load cart from localStorage on initialization
const loadCartFromStorage = (): void => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (storedCart) {
      cartItems.value = JSON.parse(storedCart)
    }
  } catch (error) {
    console.error('Error loading cart from storage:', error)
  }
}

// Save cart to localStorage
const saveCartToStorage = (): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value))
  } catch (error) {
    console.error('Error saving cart to storage:', error)
  }
}

// Initialize cart from localStorage
loadCartFromStorage()

// Watch for changes and persist to localStorage
watch(cartItems, () => {
  saveCartToStorage()
}, { deep: true })

export function useCart() {
  const cartCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const addToCart = (album: Album): void => {
    const existingItem = cartItems.value.find(item => item.id === album.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({ ...album, quantity: 1 })
    }

    // Show notification
    showNotification(`"${album.title}" added to cart`)
  }

  const removeFromCart = (albumId: number): void => {
    const index = cartItems.value.findIndex(item => item.id === albumId)
    if (index > -1) {
      const removedItem = cartItems.value[index]
      cartItems.value.splice(index, 1)
      showNotification(`"${removedItem.title}" removed from cart`)
    }
  }

  const updateQuantity = (albumId: number, quantity: number): void => {
    const item = cartItems.value.find(item => item.id === albumId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(albumId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = (): void => {
    cartItems.value = []
    showNotification('Cart cleared')
  }

  const isInCart = (albumId: number): boolean => {
    return cartItems.value.some(item => item.id === albumId)
  }

  const getCartItem = (albumId: number): CartItem | undefined => {
    return cartItems.value.find(item => item.id === albumId)
  }

  const openCart = (): void => {
    showCartModal.value = true
  }

  const closeCart = (): void => {
    showCartModal.value = false
  }

  const showNotification = (message: string): void => {
    notification.value = { message, visible: true }
    setTimeout(() => {
      notification.value.visible = false
    }, 3000)
  }

  const getTotalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  return {
    cartItems,
    cartCount,
    showCartModal,
    notification,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItem,
    openCart,
    closeCart,
    getTotalPrice
  }
}

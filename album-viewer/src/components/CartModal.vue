<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showCartModal" class="modal-overlay" @click="closeCart">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>🛒 Shopping Cart</h2>
            <button class="close-btn" @click="closeCart" aria-label="Close cart">×</button>
          </div>
          
          <div class="modal-body">
            <div v-if="cartItems.length === 0" class="empty-cart">
              <p>Your cart is empty</p>
              <p class="empty-subtitle">Add some albums to get started!</p>
            </div>
            
            <div v-else class="cart-items">
              <div v-for="item in cartItems" :key="item.id" class="cart-item">
                <img 
                  :src="item.image_url" 
                  :alt="item.title"
                  class="item-image"
                  @error="handleImageError"
                />
                
                <div class="item-details">
                  <h3 class="item-title">{{ item.title }}</h3>
                  <p class="item-artist">{{ item.artist }}</p>
                  <p class="item-price">${{ item.price.toFixed(2) }}</p>
                </div>
                
                <div class="item-actions">
                  <div class="quantity-controls">
                    <button 
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      class="qty-btn"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span class="quantity">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      class="qty-btn"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    @click="removeFromCart(item.id)"
                    class="remove-btn"
                    aria-label="Remove from cart"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="cartItems.length > 0" class="modal-footer">
            <div class="total">
              <span class="total-label">Total:</span>
              <span class="total-amount">${{ getTotalPrice.toFixed(2) }}</span>
            </div>
            <div class="footer-actions">
              <button @click="clearCart" class="clear-btn">Clear Cart</button>
              <button class="checkout-btn">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'

const { 
  cartItems, 
  showCartModal, 
  closeCart, 
  removeFromCart, 
  updateQuantity,
  clearCart,
  getTotalPrice 
} = useCart()

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/80x80/667eea/white?text=Album'
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.modal-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.8rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2.5rem;
  color: #999;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 2rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  color: #999;
}

.empty-cart p {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.empty-subtitle {
  font-size: 1rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.cart-item:hover {
  background: #f0f0f0;
  transform: translateX(5px);
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-title {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-artist {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.item-price {
  margin: 0;
  color: #667eea;
  font-weight: bold;
  font-size: 1.1rem;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border-radius: 8px;
  padding: 0.25rem;
}

.qty-btn {
  background: #667eea;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.qty-btn:hover {
  background: #5a6fd8;
  transform: scale(1.1);
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: bold;
  color: #333;
}

.remove-btn {
  background: transparent;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #ff6b6b;
  color: white;
}

.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 2px solid #f0f0f0;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 12px;
}

.total-label {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
}

.total-amount {
  font-size: 1.8rem;
  font-weight: bold;
  color: #667eea;
}

.footer-actions {
  display: flex;
  gap: 1rem;
}

.clear-btn,
.checkout-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-btn {
  background: transparent;
  color: #ff6b6b;
  border: 2px solid #ff6b6b;
}

.clear-btn:hover {
  background: #ff6b6b;
  color: white;
}

.checkout-btn {
  background: #667eea;
  color: white;
}

.checkout-btn:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content {
  transform: scale(0.9) translateY(-20px);
}

.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(20px);
}

@media (max-width: 768px) {
  .modal-content {
    max-height: 95vh;
    margin: 0.5rem;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
  
  .cart-item {
    flex-direction: column;
    gap: 1rem;
  }
  
  .item-actions {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  
  .footer-actions {
    flex-direction: column;
  }
}
</style>

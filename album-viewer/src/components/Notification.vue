<template>
  <Teleport to="body">
    <Transition name="notification">
      <div v-if="notification.visible" class="notification">
        <span class="notification-icon">✓</span>
        <span class="notification-message">{{ notification.message }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'

const { notification } = useCart()
</script>

<style scoped>
.notification {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: #4caf50;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 2000;
  max-width: 400px;
  animation: slideIn 0.3s ease;
}

.notification-icon {
  background: rgba(255, 255, 255, 0.3);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.notification-message {
  font-size: 0.95rem;
  font-weight: 500;
}

/* Notification transitions */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .notification {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}
</style>

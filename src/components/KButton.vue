<template>
  <button :type="type" :class="['k-button', `k-button--${variant}`, { 'k-button--block': block }]">
    <slot />
  </button>
</template>

<script setup>
// En knapp för hela appen. Utseendet väljs med variant – inte med en ny komponent.
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'text'].includes(value),
  },
  // 'button' som standard – annars skickar varje knapp i ett formulär formuläret
  type: { type: String, default: 'button' },
  block: { type: Boolean, default: false },
})
</script>

<style scoped>
.k-button {
  display: inline-block;
  font: inherit;
  font-size: 15px;
  line-height: 1.2;
  border-radius: 6px;
  padding: 10px 18px;
  border: 1px solid transparent;
  cursor: pointer;
}

.k-button--primary {
  background: #2f54eb;
  color: #fff;
}

.k-button--secondary {
  background: #eef1ff;
  color: #2f54eb;
  border-color: #2f54eb;
}

.k-button--text {
  background: none;
  color: #2f54eb;
  padding: 2px 4px;
  font-size: 14px;
  text-decoration: underline;
}

.k-button--block {
  display: block;
  width: 100%;
}

.k-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Fokusringen bor i komponenten: syns vid Tab, inte vid musklick */
.k-button:focus-visible {
  outline: 2px solid transparent;
  box-shadow:
    0 0 0 2px #fff,
    0 0 0 5px #2f54eb;
}
</style>

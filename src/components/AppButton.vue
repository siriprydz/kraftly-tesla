<template>
  <button class="app-btn" :style="{ background: color }"><slot /></button>
</template>

<script>
// new button for the profile page, the old one couldn't be themed /J
// TODO merge with BaseButton some day
export default {
  name: 'AppButton',
  props: { color: { type: String, default: '#2f54eb' } }
}
</script>

<style scoped>
.app-btn { border: 0; color: white; padding: 11px 20px; border-radius: 8px; font-size: 15px; cursor: pointer; }
</style>

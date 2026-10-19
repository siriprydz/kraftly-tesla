<template>
  <span :class="['status-chip', statusClass]">
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { invoiceStatus } from '../utils/invoice'

const props = defineProps({
  invoice: {
    type: Object,
    required: true,
  },
})

const status = computed(() => invoiceStatus(props.invoice, new Date()))

const statusClass = computed(() => {
  if (status.value === 'Betald') return 'status-betald'
  if (status.value === 'Förfallen') return 'status-forfallen'
  return 'status-obetald'
})
</script>

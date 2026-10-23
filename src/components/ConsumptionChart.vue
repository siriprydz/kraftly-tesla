<template>
  <canvas ref="canvas" role="img" :aria-label="summary" />
</template>

<script setup>
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip)

const props = defineProps({
  months: { type: Array, default: () => [] },
  values: { type: Array, default: () => [] },
})
const canvas = ref(null)
const summary = computed(
  () =>
    'Förbrukning per månad i kWh: ' +
    (props.months ?? []).map((m, i) => `${m} ${props.values?.[i]}`).join(', '),
)

let chart = null

onMounted(() => {
  chart = new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: props.months,
      datasets: [
        {
          label: 'Förbrukning (kWh)',
          data: props.values,
          backgroundColor: '#2f54eb',
          borderRadius: 4,
        },
      ],
    },
    options: { plugins: { legend: { display: false } } },
  })
})

onBeforeUnmount(() => {
  if (chart) chart.destroy()
})
</script>

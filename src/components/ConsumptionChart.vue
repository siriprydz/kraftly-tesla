<template>
  <canvas ref="canvas" height="120"></canvas>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({ months: Array, values: Array })
const canvas = ref(null)
let chart = null

onMounted(() => {
  chart = new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: props.months,
      datasets: [{
        label: 'Förbrukning (kWh)',
        data: props.values,
        backgroundColor: '#2f54eb',
        borderRadius: 4
      }]
    },
    options: { plugins: { legend: { display: false } } }
  })
})

onBeforeUnmount(() => {
  if (chart) chart.destroy()
})
</script>

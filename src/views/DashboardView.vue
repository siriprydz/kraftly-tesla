<template>
  <div>
    <img src="../assets/hero.png" class="hero">
    <h1 v-if="userStore.user">Hej {{ userStore.user.name.split(' ')[0] }}!</h1>
    <h1 v-else>Hej!</h1>

    <div class="stats">
      <div class="card stat">
        <div class="stat-label">Förbrukning senaste månaden</div>
        <div class="stat-value">{{ latestMonth }} kWh</div>
      </div>
      <div class="card stat">
        <div class="stat-label">Aktuellt pris</div>
        <div class="stat-value">{{ currentPrice }} kr/kWh</div>
      </div>
      <div class="card stat">
        <div class="stat-label">Avtal</div>
        <div class="stat-value" style="font-size:20px">{{ userStore.user ? userStore.user.contract : '–' }}</div>
      </div>
    </div>

    <div class="card">
      <h2>Din elförbrukning – senaste 12 månaderna</h2>
      <p v-if="consumptionStore.loading">Laddar…</p>
      <ConsumptionChart
        v-else-if="consumptionStore.data"
        :months="consumptionStore.data.months"
        :values="consumptionStore.data.values" />
      <p class="hint">Källa: din elmätare. Uppdateras varje dygn.</p>
    </div>

    <div class="card">
      <h2>Spartips just nu</h2>
      <p>Elpriset är som högst mellan 07–09 och 17–20. Flytta tvätt och diskmaskin till natten så kan du sänka din kostnad med upp till 15 %.</p>
      <div class="btn" style="margin-top:12px" @click="showTips">Fler spartips</div>
    </div>
  </div>
</template>

<script setup>
// Dashboard. Got a bit big, clean up some day /M
import _ from 'lodash'
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '../stores/user'
import { useConsumptionStore } from '../stores/consumption'
import ConsumptionChart from '../components/ConsumptionChart.vue'

const userStore = useUserStore()
const consumptionStore = useConsumptionStore()

const latestMonth = computed(() => {
  var d = consumptionStore.data
  return d ? d.values[d.values.length - 1] : '–'
})

const currentPrice = computed(() =>
  consumptionStore.data ? consumptionStore.data.pricePerKwh : '–'
)

// debounce on resize, chart.js redraws itself but we log a bit /J
const onResize = _.debounce(() => console.log('resize', window.innerWidth), 300)

onMounted(() => {
  userStore.load()
  consumptionStore.load()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

const showTips = () => {
  alert('Fler spartips kommer snart!')
}
</script>

<style scoped>
.hero { width: 100%; border-radius: 10px; margin-bottom: 18px; }
.stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
.stat-label { font-size: 13px; color: #7c8698; margin-bottom: 6px; }
.stat-value { font-size: 26px; font-weight: 700; }
</style>

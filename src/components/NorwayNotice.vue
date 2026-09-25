<template>
  <div v-if="enabled" class="card norway" data-testid="norway-notice">
    <h2><span aria-hidden="true">🇳🇴</span> Kraftly kommer till Norge</h2>
    <p>
      Under våren lanserar vi i Norge. Har du abonnemang på båda sidor gränsen kommer du snart kunna
      se förbrukning och fakturor för båda här på Mina sidor.
    </p>
  </div>
</template>

<script setup>
// Norge-stödet enligt CTO:ns expansionsplan. Ligger bakom en feature flag som sätts
// per miljö när containern startar: på i staging, av i produktion tills affären är klar.
// Att slå av den kräver ingen ny build och ingen rollback – bara en miljövariabel.
import { isEnabled } from '../utils/features'

const enabled = isEnabled('norway')
</script>

<style scoped>
.norway {
  border-left: 4px solid #ba0c2f;
}
</style>

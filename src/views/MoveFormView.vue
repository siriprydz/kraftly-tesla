<template>
  <div>
    <h1>Flyttanmälan</h1>
    <div class="card" style="max-width: 560px">
      <p style="margin-bottom: 14px">Fyll i uppgifterna nedan så flyttar vi ditt elavtal.</p>

      <KField
        id="address"
        v-model="form.address"
        label="Ny adress"
        autocomplete="street-address"
        :error="errors.address"
      />
      <KField
        id="zip"
        v-model="form.zip"
        label="Postnummer"
        inputmode="numeric"
        autocomplete="postal-code"
        :error="errors.zip"
      />
      <KField
        id="city"
        v-model="form.city"
        label="Ort"
        autocomplete="address-level2"
        :error="errors.city"
      />
      <KField
        id="date"
        v-model="form.date"
        label="Inflyttningsdatum (ÅÅÅÅ-MM-DD)"
        :error="errors.date"
      />
      <label for="contract">Avtal</label>
      <select
        id="contract"
        v-model="form.contract"
        :aria-invalid="errors.contract ? 'true' : undefined"
        :aria-describedby="errors.contract ? 'contract-error' : undefined"
      >
        <option disabled value="">Välj avtal</option>
        <option>Rörligt pris</option>
        <option>Fast pris 1 år</option>
        <option>Fast pris 3 år</option>
      </select>
      <p v-if="errors.contract" id="contract-error" class="error">{{ errors.contract }}</p>

      <KButton type="submit" @click="submit">Skicka flyttanmälan</KButton>
      <p class="hint" style="margin-top: 8px">Anmälan måste göras senast 14 dagar före flytt</p>
      <p v-if="reference" style="color: #067647; margin-top: 10px">
        Tack! Referensnummer: {{ reference }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import KButton from '../components/KButton.vue'
import { submitMove } from '../services/api'
import { validateMove } from '../utils/validateMove.js'
import KField from '../components/KField.vue'

// Samma ordning som i formuläret – validateMove lägger inte felen i den ordningen
const FIELD_ORDER = ['address', 'zip', 'city', 'date', 'contract']

const form = reactive({ address: '', zip: '', city: '', date: '', contract: '' })
const reference = ref(null)
const errors = ref({})

const submit = async () => {
  const validationErrors = validateMove(form, new Date())
  errors.value = validationErrors

  if (Object.keys(validationErrors).length > 0) {
    const firstInvalid =
      FIELD_ORDER.find((field) => validationErrors[field]) ?? Object.keys(validationErrors)[0]
    // Fokus på fältet gör att skärmläsaren läser upp dess label och fel
    await nextTick()
    document.getElementById(firstInvalid)?.focus()
    return
  }

  const res = await submitMove(form)
  reference.value = res.ref
}
</script>

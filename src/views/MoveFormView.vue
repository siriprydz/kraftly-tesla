<template>
  <div>
    <h1>Flyttanmälan</h1>
    <div class="card" style="max-width:560px">
      <p style="margin-bottom:14px">Fyll i uppgifterna nedan så flyttar vi ditt elavtal.</p>

      <label for="address">Ny adress</label>
      <input id="address" type="text" placeholder="Ny adress" v-model="form.address">
      <p v-if="errors.address" class="error">{{ errors.address }}</p>

      <label for="zip">Postnummer</label>
      <input id="zip" type="text" placeholder="Postnummer" v-model="form.zip">
      <p v-if="errors.zip" class="error">{{ errors.zip }}</p>

      <label for="city">Ort</label>
      <input id="city" type="text" placeholder="Ort" v-model="form.city">
      <p v-if="errors.city" class="error">{{ errors.city }}</p>

      <label for="date">Inflyttningsdatum</label>
      <input id="date" type="text" placeholder="Inflyttningsdatum (ÅÅÅÅ-MM-DD)" v-model="form.date">
      <p v-if="errors.date" class="error">{{ errors.date }}</p>

      <label for="contract">Avtal</label>
      <select id="contract" v-model="form.contract">
        <option disabled value="">Välj avtal</option>
        <option>Rörligt pris</option>
        <option>Fast pris 1 år</option>
        <option>Fast pris 3 år</option>
      </select>
      <p v-if="errors.contract" class="error">{{ errors.contract }}</p>

      <BaseButton @click="submit">Skicka flyttanmälan</BaseButton>
      <p class="hint" style="margin-top:8px">Anmälan måste göras senast 14 dagar före flytt</p>
      <p v-if="reference" style="color:#12b76a;margin-top:10px">Tack! Referensnummer: {{ reference }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import { submitMove } from '../services/api'
import { validateMove } from '../utils/validateMove.js'

const form = reactive({ address: '', zip: '', city: '', date: '', contract: '' })
const reference = ref(null)
const errors = ref({})

const submit = async () => {
  const validationErrors = validateMove(form, new Date())
  errors.value = validationErrors

  if (Object.keys(validationErrors).length > 0) {
    return
  }

  const res = await submitMove(form)
  reference.value = res.ref
}
</script>

<template>
  <div>
    <h1>Flyttanmälan</h1>
    <div class="card" style="max-width:560px">
      <p style="margin-bottom:14px">Fyll i uppgifterna nedan så flyttar vi ditt elavtal.</p>
      <input type="text" placeholder="Ny adress" v-model="form.address">
      <input type="text" placeholder="Postnummer" v-model="form.zip">
      <input type="text" placeholder="Ort" v-model="form.city">
      <input type="text" placeholder="Inflyttningsdatum (ÅÅÅÅ-MM-DD)" v-model="form.date">
      <select v-model="form.contract">
        <option disabled value="">Välj avtal</option>
        <option>Rörligt pris</option>
        <option>Fast pris 1 år</option>
        <option>Fast pris 3 år</option>
      </select>
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

const form = reactive({ address: '', zip: '', city: '', date: '', contract: '' })
const reference = ref(null)

const submit = async () => {
  // TODO validation
  const res = await submitMove(form)
  reference.value = res.ref
}
</script>

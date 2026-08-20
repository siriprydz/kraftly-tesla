<template>
  <div>
    <h1>Fakturor</h1>
    <div class="card">
      <table>
        <tr>
          <th>Faktura</th><th>Period</th><th>Belopp</th><th>Förfaller</th><th>Status</th><th></th>
        </tr>
        <tr v-for="invoice in invoices" :key="invoice.id">
          <td>{{ invoice.id }}</td>
          <td>{{ invoice.period }}</td>
          <td>{{ invoice.amount }} kr</td>
          <td>{{ invoice.due }}</td>
          <td><span :class="['status-chip', invoice.status === 'Betald' ? 'status-betald' : 'status-obetald']">{{ invoice.status }}</span></td>
          <td><div class="download" @click="downloadInvoice(invoice)">Ladda ner</div></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchInvoices } from '../services/api'

const invoices = ref([])

onMounted(async () => {
  invoices.value = await fetchInvoices()
})

const downloadInvoice = (invoice) => {
  // PDF generation coming in phase 2 per the quote
  console.log('download', invoice.id)
  alert('Nedladdning kommer snart')
}
</script>

<style scoped>
.download { color: #2f54eb; cursor: pointer; font-size: 14px; }
</style>

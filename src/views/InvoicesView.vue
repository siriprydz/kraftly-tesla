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
          <td>{{ formatAmount(invoice.amount) }} kr</td>
          <td>{{ invoice.due }}</td>
          <td>
            <span :class="['status-chip', getStatusClass(invoice)]">
              {{ getStatus(invoice) }}
            </span>
          </td>
          <td><div class="download" @click="downloadInvoice(invoice)">Ladda ner</div></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchInvoices } from '../services/api'
import { formatAmount } from '../utils/format'
import { invoiceStatus } from '../utils/invoice'

const invoices = ref([])

const getStatus = (invoice) => invoiceStatus(invoice, new Date())

const getStatusClass = (invoice) => {
  const status = getStatus(invoice)

  if (status === 'Betald') return 'status-betald'
  if (status === 'Förfallen') return 'status-forfallen'
  return 'status-obetald'
}

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

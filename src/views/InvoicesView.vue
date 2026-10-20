<template>
  <div>
    <h1>Fakturor</h1>
    <div class="card">
      <table>
        <thead>
          <tr>
            <th scope="col">Faktura</th>
            <th scope="col">Period</th>
            <th scope="col">Belopp</th>
            <th scope="col">Förfaller</th>
            <th scope="col">Status</th>
            <th scope="col"><span class="visually-hidden">Åtgärd</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id">
            <td>{{ invoice.id }}</td>
            <td>{{ invoice.period }}</td>
            <td>{{ formatAmount(invoice.amount) }} kr</td>
            <td>{{ invoice.due }}</td>
            <td>
              <StatusChip :invoice="invoice" />
            </td>
            <td>
              <KButton class="download" variant="text" @click="downloadInvoice(invoice)">
                Ladda ner <span class="visually-hidden">faktura {{ invoice.id }}</span>
              </KButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StatusChip from '../components/StatusChip.vue'
import { fetchInvoices } from '../services/api'
import { formatAmount } from '../utils/format'
import KButton from '../components/KButton.vue'

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
.download {
  color: #2f54eb;
  cursor: pointer;
  font-size: 14px;
}
</style>

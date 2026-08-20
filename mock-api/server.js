// Simple mock of Kraftly's API. Built for the demo -- NOT for production.
// Webbmakarna AB / M & J
const express = require('express')
const app = express()
app.use(express.json())

// CORS -- opens everything so it just works
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

const user = {
  id: 1,
  name: 'Anna Andersson',
  email: 'anna.andersson@example.com',
  address: 'Solvägen 12, 802 67 Gävle',
  contract: 'Rörligt pris',
  customerNo: 'K-104233'
}

const invoices = [
  { id: 'F-2026-06', period: 'Juni 2026', amount: 412, status: 'Obetald', due: '2026-07-31' },
  { id: 'F-2026-05', period: 'Maj 2026', amount: 486, status: 'Betald', due: '2026-06-30' },
  { id: 'F-2026-04', period: 'April 2026', amount: 655, status: 'Betald', due: '2026-05-31' },
  { id: 'F-2026-03', period: 'Mars 2026', amount: 918, status: 'Betald', due: '2026-04-30' },
  { id: 'F-2026-02', period: 'Februari 2026', amount: 1204, status: 'Betald', due: '2026-03-31' },
  { id: 'F-2026-01', period: 'Januari 2026', amount: 1345, status: 'Betald', due: '2026-02-28' }
]

const consumption = {
  unit: 'kWh',
  months: ['Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun'],
  values: [210, 195, 260, 340, 520, 680, 730, 640, 470, 320, 240, 205],
  pricePerKwh: 1.42
}

// anyone gets in, we'll add real auth later(TM)
app.post('/api/login', (req, res) => {
  res.json({ token: 'fake-token-123', name: user.name })
})

app.get('/api/user', (req, res) => res.json(user))

app.get('/api/consumption', (req, res) => {
  // quick fix: dashboard felt too fast in the demo, added a delay so the spinner shows /J
  setTimeout(() => res.json(consumption), 600)
})

app.get('/api/invoices', (req, res) => res.json(invoices))

app.post('/api/move', (req, res) => {
  console.log('Move request:', req.body)
  res.json({ ok: true, ref: 'FLYTT-' + Math.floor(Math.random() * 90000 + 10000) })
})

app.put('/api/user', (req, res) => {
  Object.assign(user, req.body)
  res.json(user)
})

app.listen(4000, () => console.log('Mock API on http://localhost:4000'))

// Hållbarhetssiffran (vecka 10, M9): bytes i dist/ → g CO2e per besök → kg CO2e per månad.
//
//   npm run build && npm run co2
//   KUNDER=40000 SESSIONER=3.2 ANDEL_FORSTA=0.3 npm run co2     # egna antaganden
//   node scripts/co2.mjs annan/mapp/dist                          # mät ett annat bygge
//
// Vad som mäts: index.html + allt under assets/ – det ett första besök kan hämta, okomprimerat
// (som filerna ligger på disk, inte som de går över nätet med gzip/brotli). Lata vyer räknas
// med, så det är en övre gräns för ett besök som går igenom hela portalen.
//
// Modellen: Sustainable Web Design v4 via co2.js (Green Web Foundation). Energi per GB för
// datacenter, nät och enhet, gånger elmixen (g CO2e per kWh). Grov modell – redovisa den som grov.
import { readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { co2, averageIntensity } from '@tgwf/co2'

const dist = process.argv[2] ?? 'dist'

// Antaganden – miljövariabler med standardvärden. Skriv ut dem bredvid siffran, alltid.
const KUNDER = Number(process.env.KUNDER ?? 40000) // inloggade kunder per månad (Kraftly)
const SESSIONER = Number(process.env.SESSIONER ?? 3.2) // sessioner per kund och månad
// Andel besök som hämtar allt (tom cache). 1 = varje besök som ett första besök (övre gräns).
// Under 1: återbesöken hämtar bara index.html – resten ligger i cachen (cache-headers sedan M7).
const ANDEL_FORSTA = Number(process.env.ANDEL_FORSTA ?? 1)

if (!existsSync(join(dist, 'index.html'))) {
  console.error(`Hittar inte ${dist}/index.html – kör npm run build först.`)
  process.exit(1)
}

// Summera filstorlekar rekursivt
const sizeOf = (path) =>
  statSync(path).isDirectory()
    ? readdirSync(path).reduce((sum, name) => sum + sizeOf(join(path, name)), 0)
    : statSync(path).size

const htmlBytes = sizeOf(join(dist, 'index.html'))
const bytes = htmlBytes + (existsSync(join(dist, 'assets')) ? sizeOf(join(dist, 'assets')) : 0)

// Elmix ur co2.js egna data (Ember, årsmedel). Landskoder är ISO alpha-3: SWE, inte SE.
const model = new co2({ model: 'swd', version: 4 })

const options = (country) => ({
  gridIntensity: { device: { country }, dataCenter: { country }, network: { country } },
  firstVisitPercentage: ANDEL_FORSTA,
  returnVisitPercentage: 1 - ANDEL_FORSTA,
  dataReloadRatio: htmlBytes / bytes, // återbesök: bara index.html hämtas om
})

// perVisitTrace ger g CO2e per besök och vilka värden som användes
// Tillverkningen av servrar, nät och telefoner (en andel per GB) räknas med global elmix oavsett
// land – därför blir den svenska siffran inte tretton gånger lägre än den globala.
const se = model.perVisitTrace(bytes, false, options('SWE'))
const global = model.perVisitTrace(bytes, false, options('WORLD'))

const besokPerManad = KUNDER * SESSIONER
const kg = (gramPerVisit) => (gramPerVisit * besokPerManad) / 1000
// Energin: SWD v4 räknar 0,30 kWh per GB (drift 0,194 + tillverkning 0,106, datacenter + nät + enhet)
const KWH_PER_GB = 0.055 + 0.059 + 0.08 + 0.012 + 0.013 + 0.081
const bytesPerBesok = bytes * (ANDEL_FORSTA + (1 - ANDEL_FORSTA) * (htmlBytes / bytes))
const kwhPerManad = ((bytesPerBesok * besokPerManad) / 1e9) * KWH_PER_GB
const sv = (n, d) =>
  n.toLocaleString('sv-SE', { minimumFractionDigits: d, maximumFractionDigits: d })

console.log(
  `\nco2.js – Sustainable Web Design v4 · ${dist}/ (index.html + assets/, okomprimerat)\n`,
)
console.log(
  '| kB per besök | g CO2e per besök (SE) | kg CO2e per månad (SE) | kg CO2e per månad (globalt) |',
)
console.log('|---:|---:|---:|---:|')
console.log(
  `| ${sv(bytes / 1000, 0)} | ${sv(se.co2, 3)} | ${sv(kg(se.co2), 1)} | ${sv(kg(global.co2), 1)} |`,
)
console.log(`
Elmix (co2.js): Sverige ${sv(averageIntensity.data.SWE, 2)} g CO2e/kWh (SWE) · globalt ${sv(averageIntensity.data.WORLD, 2)} g CO2e/kWh (WORLD)
Energi: ${sv(kwhPerManad, 1)} kWh per månad (${sv((bytesPerBesok * besokPerManad) / 1e9, 1)} GB × ${sv(KWH_PER_GB, 2)} kWh/GB)
Antaganden: ${sv(KUNDER, 0)} kunder × ${sv(SESSIONER, 1)} sessioner = ${sv(besokPerManad, 0)} besök/månad · andel förstabesök ${sv(ANDEL_FORSTA * 100, 0)} %
Obs: tillverkningen av enheter, nät och datacenter räknas alltid med SWD v4:s globala 494 g CO2e/kWh – bara driften får landets mix.`)

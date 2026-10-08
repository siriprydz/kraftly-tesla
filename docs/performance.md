# Prestanda

## Så mäter vi

Dashboarden: Chrome DevTools → Performance → Local metrics, produktionsbygget, enhetsläge
iPhone 12 Pro, Fast 4G, cache av, median av tre. /login: Lighthouse CI i pipelinen. JavaScript: gzip i `npm run build`.

## Budgeten

| Mått       | Budget  | Var         | Varför just den   |
| ---------- | ------- | ----------- | ----------------- |
| LCP        | ≤ 2,5 s | /login i CI | …                 |
| CLS        | ≤ 0,1   | /login i CI | …                 |
| JavaScript | ≤ … kB  | /login i CI | vi ligger på … kB |

## Optimeringarna

### 1. Bilden och det som hoppar

Problemet var att bilden laddade långsamt pga sin stora vikt. Det kombinerat med ospecificerad höjd och bredd, gjorde att sidan hoppade till när sidan laddades in. Även diagrammet hoppade till när /api/v2/consumption hade hämtats klart. Vi löste detta genom att:

- Minska bildens storlek och vikt
- Ändra bildens format till webp
- Specificera höjd och bredd för bild
- Lägga till fetchpriority="high" på bild
- Specificera aspect ratio för diagram

Länk till PR: https://github.com/siriprydz/kraftly-tesla/pull/63

(Tabellerna nedan visas i den ordning optimeringarna implementerades. Resultaten i varje tabell påverkas alltså av ändringarna som beskrivs ovanför den.)

| Bildens tyngd     | Före     | Efter     |
| ----------------- | -------- | --------- |
| LCP               | 7,57s    | 0.75 s    |
| CLS               | 0,02     | 0.06      |
| JavaScript (gzip) | 142,13kb | 142.13 kB |

| Specificerad höjd, bredd och fetchpriority="high" | Före     | Efter     |
| ------------------------------------------------- | -------- | --------- |
| LCP                                               | 7,57s    | 0.92s     |
| CLS                                               | 0,02     | 0.00      |
| JavaScript (gzip)                                 | 142,13kb | 142.13 kB |

| css-regel height: auto; | Före     | Efter     |
| ----------------------- | -------- | --------- |
| LCP                     | 7,57s    | 0.93s     |
| CLS                     | 0,02     | 0.00      |
| JavaScript (gzip)       | 142,13kb | 142.13 kB |

| Diagrammets plats | Före     | Efter     |
| ----------------- | -------- | --------- |
| LCP               | 7,57s    | 0.93s     |
| CLS               | 0,02     | 0.00      |
| JavaScript (gzip) | 142,13kb | 142.13 kB |

### 2. JavaScript-bundle (lazy routes, lodash, Chart.js)

Problemet var att hela appen laddades som en JavaScript-fil (142,13 kB gzip), även när
användaren bara besökte `/login`. Dashboarden drog dessutom in lodash (enbart debounce)
och hela Chart.js via `chart.js/auto`.

Vi löste det genom:

- Lazy routes - varje vy laddas när den behövs via dynamic import i `src/router/index.js`
- Suspense - visar "Laddar..." medan en route-chunk hämtas (`src/App.vue`)
- Lodash borttaget — ersatt med egen `debounce` i `src/utils/debounce.js`
- Chart.js tree-shaking — namngivna imports + `Chart.register()` istället för `chart.js/auto`
- Lazy load av diagram — `ConsumptionChart` laddas via `defineAsyncComponent` i `DashboardView.vue`

Länk till PR: <https://github.com/siriprydz/kraftly-tesla/pull/64>

Steg-för-steg-resultat finns i PR:en ovan. JavaScript mäts som gzip vid `npm run build`.
För `/login` räknas shared `index.js` + vy-chunken.

|                                     | Före                    | Efter    |
| ----------------------------------- | ----------------------- | -------- |
| LCP                                 | 7,57 s                  | 7,93 s   |
| CLS                                 | 0,02                    | 0,02     |
| JavaScript (gzip, `/login`)         | 142,13 kB               | 43,91 kB |
| JavaScript (gzip, dashboard-skalet) | 142,13 kB (allt samlat) | 1,69 kB  |
| JavaScript (gzip, diagram, lazy)    | (ingick ovan)           | 50,29 kB |

Efter optimering: en `.js`-fil per vy (`index.js` 42,82 kB, `LoginView.js` 1,09 kB,
`DashboardView.js` 1,69 kB, `ConsumptionChart.js` 50,29 kB lazy, m.fl.). Vid besök på `/`
laddas dashboard-skalet direkt; diagram-chunken hämtas separat när förbrukningsdata finns.

## Flaskhalsen vi inte äger

Det tar drygt en halv sekund för för hämtningen mot Kraftlys test-API, och den tiden kan vi inte påverka. Det vi gjorde var att se till att diagrammet har en bestämd aspect ratio. På så sätt hoppar inte sidan när datan laddas in.

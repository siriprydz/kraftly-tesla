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

## Flaskhalsen vi inte äger

Det tar drygt en halv sekund för för hämtningen mot Kraftlys test-API, och den tiden kan vi inte påverka. Det vi gjorde var att se till att diagrammet har en bestämd aspect ratio. På så sätt hoppar inte sidan när datan laddas in.

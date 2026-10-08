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

### 1. <Vad>

<Vad var problemet, vad gjorde vi, länk till PR:en.>

|     | Före  | Efter |
| --- | ----- | ----- |
| LCP | 7,57s | …     |
| CLS | 0,02  | …     |

## Flaskhalsen vi inte äger

<API-fördröjningen: var den syns, vad vi gjorde åt vår del.>

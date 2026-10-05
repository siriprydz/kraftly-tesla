# Beslut: tokenlagring

**Beslut:** Access token lagras i minnet. Refresh token lagras i en httpOnly-cookie som API:t sätter.

## Alternativ

| Alternativ     | Hur                               | Fördel                                       | Nackdel                                                               |
| -------------- | --------------------------------- | -------------------------------------------- | --------------------------------------------------------------------- |
| `localStorage` | Token sparas i browsern           | Enkelt, överlever sidladdning                | Lätt att stjäla via XSS                                               |
| Cookie         | Token i cookie (helst httpOnly)   | Kan skyddas mot JavaScript                   | Kräver CSRF-skydd på muterande anrop                                  |
| Minne          | Vue ref i `src/services/token.js` | JavaScript kan inte läsa det via storage-API | Försvinner vid sidladdning – session hålls vid liv via refresh-cookie |

## Motivering

Vi valde minne för access token eftersom det minskar XSS-risken: ett stulet script kan inte läsa token från `localStorage` eller `document.cookie`.

Refresh token ligger i httpOnly-cookie så att sessionen kan återställas efter sidladdning utan att spara access token permanent i browsern. Vid 401 anropar frontend `/api/v2/auth/refresh` och får ett nytt access token.

## Konsekvens

Access token försvinner vid sidladdning/ny flik, men refresh-cookien gör att `main.js` kan hämta nytt token automatiskt. Logout rensar bara minnet idag, refresh-cookien kräver ett API-anrop för att rensas ordentligt.

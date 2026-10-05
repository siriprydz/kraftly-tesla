# Säkerhet - Tesla

## Hotbilden i en mening

Portalen visar kunddata i form av förbrukning, fakturor, adress och flyttanmälan. Angriparen är någon som försöker komma åt en annan kunds konto via stulen token, XSS eller obehöriga API-anrop.

## Autentiseringen (M6)

Kunden loggar in via `/login` med e-post och lösenord. Frontend skickar `POST /api/v2/auth/login` (relativ URL, samma origin). API:t svarar med ett access token som sparas i minnet (`src/services/token.js`), inte i `localStorage` eller cookies.

**Refresh:** API:t sätter en httpOnly-cookie (`kraftly_refresh`) vid login. Access token försvinner vid sidladdning/ny flik, men `main.js` anropar `/api/v2/auth/refresh` vid start och hämtar nytt token via cookien, därför upplevs användaren som fortfarande inloggad. Vid 401 under session anropas samma endpoint. Flödet testas i `src/services/api.test.js`.

**API-skydd:** Browsern når aldrig API-nyckeln. Nginx (eller Vite lokalt) proxar `/api/` och lägger till `X-Api-Key` server-side. Skyddade endpoints kräver dessutom `Authorization: Bearer <token>`. Routerns guard (`src/router/index.js`) är bara UX och det riktiga skyddet är 401 från API:t.

## OWASP Top 10 – genomgång

| #   | Risk                             | Gäller oss? | Vad vi hittade                                                 | Vad vi gjorde                                                                                             | Kontroll                                     |
| --- | -------------------------------- | ----------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| A01 | Broken Access Control            | Ja          | Routern stoppar bara navigation, inte API                      | Frontend skickar inga kund-ID:n. API väljer kund ur token och ignorerar `?customerNo=`                    | `curl` mot staging (se IDOR-bevis)           |
| A02 | Security Misconfiguration        | Ja          | Mock-API har öppen CORS (`*`)                                  | Säkerhetsheaders i nginx. API-nyckel i miljövariabel, inte i frontend                                     | `curl -sI` mot staging (se Bevis)            |
| A04 | Cryptographic Failures           | Delvis      | Mock-API använder hårdkodade tokens, inte riktiga JWT          | Access token i minne. Refresh i httpOnly-cookie. HTTPS i staging/prod                                     | Kodgranskning av `token.js` och mock-API     |
| A05 | Injection (XSS för oss)          | Ja          | Vue escapar template-data; ingen `v-html`                      | CSP begränsar script till `'self'`                                                                        | CSP-headers på staging, manuell kodgenomgång |
| A07 | Authentication Failures          | Ja          | Logout rensar bara access token i minnet, inte refresh-cookien | Login/refresh/retry-flöde implementerat. Generiskt felmeddelande vid misslyckad login oavsett vilket fel. | `api.test.js`, Cypress inloggning            |
| A08 | Software/Data Integrity Failures | Delvis      | Inga SRI-hashar på script-taggar                               | Docker-image byggs i CI och verifieras via `/version.txt`                                                 | Deploy-jobb väntar på rätt sha               |

## Headers vi sätter (nginx)

Fem headers i `docker/security-headers.conf`, inkluderade i varje nginx-`location`:

| Header                    | Värde                                      | Syfte                                                   |
| ------------------------- | ------------------------------------------ | ------------------------------------------------------- |
| Content-Security-Policy   | `default-src 'self'; script-src 'self'; …` | Begränsar var script, stilar och anrop får laddas ifrån |
| X-Content-Type-Options    | `nosniff`                                  | Stoppar MIME-sniffing                                   |
| X-Frame-Options           | `DENY`                                     | Förhindrar clickjacking via iframe                      |
| Referrer-Policy           | `strict-origin-when-cross-origin`          | Begränsar vad som skickas i Referer-header              |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains`      | Tvingar HTTPS i browsern                                |

Verifierat på staging. Se resultat längre ner.

## Kända brister (medvetet kvar)

- **Mock-API autentiserar inte lösenord** - accepterar valfria uppgifter i demo. Dock används det inte i staging eller prod, och lokalt endast om den riktiga API-nyckeln saknas.
- **Refresh-cookie rensas inte vid logout** – `setAccessToken(null)` raderar bara access token i minnet. Refresh-cookien (`kraftly_refresh`) ligger kvar i browsern eftersom den är httpOnly och vår logout-knapp inte anropar något API. Vid sidladdning försöker `main.js` refresha automatiskt, så användaren kan bli inloggad igen utan lösenord. Mock-API har ingen logout-endpoint, oklart om riktiga API:t har det. Mest kritiskt på delad dator.
- **Mock-API har öppen CORS** - browsern når det inte direkt i Docker/staging (nginx proxar), men koden bör städas i en senare PR.
- **Ingen broms mot att gissa lösenord om och om igen** - kontot blir t ex inte spärrat eller liknande vid för många försök. Dock kan man i alla fall inte längre se om ett konto med en viss epost existerar eller inte. Värt att sätta in broms vid senare tillfälle.

## CORS

Vi lade inte till CORS i nginx. Appen anropar `/api/...` på samma adress som sidan och nginx (eller Vite lokalt) proxar till API:t, så CORS behövs inte.

Mock-API:t har fortfarande öppen CORS (`*`) i `mock-api/server.js`, men browsern når det inte direkt i Docker eller staging. Det bör städas bort i en senare PR.

## Bevis – staging

Verifierat 2026-10-05 mot `https://kraftly-tesla-staging.onrender.com`.

### Kommandon

Hashade filnamn under `/assets/` ändras vid deploy. Hämta aktuellt JS-namn innan tredje kommandot:

```bash
curl -s https://kraftly-tesla-staging.onrender.com/index.html | grep -oE '/assets/[^"]+\.js' | head -1
```

Kör sedan:

```bash
curl -sI https://kraftly-tesla-staging.onrender.com/ | grep -i -E 'content-security|x-frame|x-content'
curl -sI https://kraftly-tesla-staging.onrender.com/index.html | grep -i -E 'content-security|x-frame|x-content'
curl -sI https://kraftly-tesla-staging.onrender.com/assets/index-BAgDLhCb.js | grep -i -E 'content-security|x-frame|x-content'
```

### Resultat

`/`, `/index.html` och `/assets/index-BAgDLhCb.js` gav samma headers:

```http
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'
x-content-type-options: nosniff
x-frame-options: DENY
```

## IDOR-bevis

Frontend skickar inga kund-ID:n (`src/services/api.js`). Test mot API:t:

### IDOR-kommandon

Hämta token (giltigt i ca 10 min). Testkonton för staging delas i teamet, committas inte här:

```bash
curl -s -X POST https://kraftly-tesla-staging.onrender.com/api/v2/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"<test-användare>","password":"<lösenord>"}'
```

Logga in som två olika testkunder och testa att `?customerNo=` ignoreras (byt ut `BO_TOKEN`):

```bash
curl -s https://kraftly-tesla-staging.onrender.com/api/v2/invoices \
  -H "Authorization: Bearer BO_TOKEN"

curl -s "https://kraftly-tesla-staging.onrender.com/api/v2/invoices?customerNo=K-104233" \
  -H "Authorization: Bearer BO_TOKEN"
```

### IDOR-resultat

| Test                        | Customer no | Fakturor                                   |
| --------------------------- | ----------- | ------------------------------------------ |
| Anna                        | K-104233    | 6 st, t.ex. 412 kr (F-2026-06)             |
| Bo                          | K-208811    | 3 st, t.ex. 289 kr (F-2026-06)             |
| Bo + `?customerNo=K-104233` | K-208811    | Samma som Bo. Annas `customerNo` ignoreras |

Slutsats: ingen kund ser en annans data; API:t väljer kund ur token, inte ur URL-parametrar.

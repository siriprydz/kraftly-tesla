# Säkerhet

## CORS

Vi lade inte till CORS i nginx. Appen anropar `/api/...` på samma adress som sidan och nginx (eller Vite lokalt) proxar till API:t, så CORS behövs inte.

Mock-API:t har fortfarande öppen CORS (`*`) i `mock-api/server.js`, men browsern når det inte direkt i Docker eller staging. Det bör städastas bort i en senare PR.

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

```
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'
x-content-type-options: nosniff
x-frame-options: DENY
```

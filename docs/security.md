# Säkerhet

## CORS

Vi lade inte till CORS i nginx. Appen anropar `/api/...` på samma adress som sidan och nginx (eller Vite lokalt) proxar till API:t, så CORS behövs inte.

Mock-API:t har fortfarande öppen CORS (`*`) i `mock-api/server.js`, men browsern når det inte direkt i Docker eller staging. Det bör städastas bort i en senare PR.

## Bevis – staging

Uppdateras efter deploy.

```bash
curl -sI https://kraftly-tesla-staging.onrender.com/ | grep -i -E 'content-security|x-frame|x-content'
curl -sI https://kraftly-tesla-staging.onrender.com/index.html | grep -i -E 'content-security|x-frame|x-content'
curl -sI https://kraftly-tesla-staging.onrender.com/assets/<hash>.js | grep -i -E 'content-security|x-frame|x-content'
```

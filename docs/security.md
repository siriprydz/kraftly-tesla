# Säkerhet

## CORS

Alla våra API-anrop går via vår proxy, så vi behövde inte implementera någon CORS.

## Bevis – staging

> Uppdateras efter deploy till staging.

```bash
curl -sI https://kraftly-tesla-staging.onrender.com/ | grep -i -E 'content-security|x-frame|x-content'
curl -sI https://kraftly-tesla-staging.onrender.com/index.html | grep -i -E 'content-security|x-frame|x-content'
curl -sI https://kraftly-tesla-staging.onrender.com/assets/<hash>.js | grep -i -E 'content-security|x-frame|x-content'
```

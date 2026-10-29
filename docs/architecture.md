# Arkitektur

## Översikt

```mermaid
flowchart LR
  subgraph kund["Kundens webbläsare"]
    SPA["Vue 3-SPA<br/>Pinia · vue-router"]
  end
  subgraph render["Render – en container per miljö"]
    NGINX["nginx<br/>statiska filer + config.js<br/>proxy för /api"]
  end
  API["Kraftlys API v2<br/>(lokalt: mock-API)"]
  CI["GitHub Actions"] -->|"samma image (sha)<br/>staging → prod"| NGINX
  SPA -->|"index.html, assets"| NGINX
  SPA -->|"/api/v2/… med Bearer-token"| NGINX
  NGINX -->|"proxy_pass + API-nyckeln"| API
```

Kraftly - Mina sidor är en Vue 3-SPA: `vite build` ger statiska filer som nginx serverar från en container, och all HTML byggs i webbläsaren utan server-rendering (se [docs/decisions/rendering.md](decisions/rendering.md)). nginx proxar `/api/` vidare till Kraftlys API och lägger på API-nyckeln (`X-Api-Key`), så nyckeln aldrig hamnar i JavaScript-filerna. Eftersom containern bara serverar filer och proxar, finns inget tillstånd att hålla reda på: skala genom att starta fler likadana containrar, och driftsätt genom att byta image.

## Lagren i frontend

| Lager         | Ansvar                                                                                       | Regel                                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `views/`      | Sidorna routern känner till                                                                  | Hämtar data via stores – undantag: `LoginView`, `InvoicesView` och `MoveFormView` anropar `services/api` direkt, eftersom datan bara används där |
| `components/` | Återanvändbara delar (`KButton`, `KField`, `StatusChip`, `ConsumptionChart`, `NorwayNotice`) | Vet ingenting om API:t                                                                                                                           |
| `stores/`     | Tillstånd som delas mellan vyer (Pinia: `user`, `consumption`)                               | Anropar `services/`                                                                                                                              |
| `services/`   | HTTP mot API:t (`api.js`), token i minnet (`token.js`)                                       | Ingen Vue-kod Undantag: `token.js` håller token i en `ref`                                                                                       |
| `utils/`      | Rena funktioner (datum, format, validering, fakturastatus, feature flags)                    | Inga sidoeffekter, därför lätta att testa                                                                                                        |
| `router/`     | Rutterna och guarden för inloggning                                                          | Guarden skickar utloggade till `/login` bara för upplevelsen, det riktiga skyddet är att API:t svarar 401 utan giltig token                      |

Beroendena pekar nedåt: vy → store → service. Aldrig tvärtom.

## Ett flöde: inloggningen

```mermaid
sequenceDiagram
  actor Kund
  participant Login as LoginView
  participant Api as services/api.js
  participant Nginx as nginx
  participant API as Kraftlys API
  Kund->>Login: e-post + lösenord, Logga in
  Login->>Api: login(email, password)
  Api->>Nginx: POST /api/v2/auth/login
  Nginx->>API: proxy_pass + X-Api-Key
  API-->>Api: accessToken (+ refresh i httpOnly-cookie)
  Api-->>Login: accessToken
  Login->>Login: setAccessToken() – i minnet, services/token.js
  Login->>Kund: router.push('/') → Översikt
  Note over Api,API: Svarar API:t 401 senare anropar api.js /auth/refresh med cookien och försöker igen en gång
```

## Miljöer

| Miljö        | Adress                                        | Uppdateras                                 | Norge-flaggan | API                                 |
| ------------ | --------------------------------------------- | ------------------------------------------ | ------------- | ----------------------------------- |
| Dev (lokalt) | http://localhost:8080 (Docker) · :5173 (Vite) | när du vill                                | på            | mock-API (`npm run api`, port 4000) |
| Staging      | https://kraftly-tesla-staging.onrender.com    | varje merge till `main`                    | på            | https://kraftly-api.sprinto.cloud   |
| Prod         | https://kraftly-tesla.onrender.com            | samma image som staging, efter godkännande | av            | https://kraftly-api.sprinto.cloud   |

Samma image går genom miljöerna, konfigurationen skiljer dem åt, inte koden.

## Beslut

De tre viktigaste – alla beslut finns i [`docs/decisions/`](decisions/):

- [Hosting](decisions/hosting.md) - en container på Render, imagen byggs en gång och taggas med commitens sha i GHCR
- [Tokenlagring](decisions/tokenlagring.md) - access token i minnet, refresh token i httpOnly-cookie som API:t sätter
- [Feature flags](decisions/feature-flags.md) - Norge bakom en flagga i `config.js`, som containern skriver vid start från miljövariabeln `FEATURE_NORWAY` i Render

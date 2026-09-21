# Beslut: hosting

**Datum:** 2026-09-21
**Beslut:** Vi använder Render för staging.

## Jämförelse

| Tjänst                   | Kör vår image som den är? | Kostnad och betalning                        | Var nyckeln hamnar      | Kallstart? | Leverantörsspecifikt? |
| ------------------------ | ------------------------- | -------------------------------------------- | ----------------------- | ---------- | --------------------- |
| **Render**               | Ja                        | Gratis staging. Tjänsten somnar.             | Render secrets          | Ja         | Ja, lite              |
| **Azure Container Apps** | Ja                        | Betalning efter användning.                  | Azure secrets/Key Vault | Ja         | Ja                    |
| **Google Cloud Run**     | Ja                        | Betalning efter användning. Free tier finns. | Cloud Run secrets       | Ja         | Ja                    |
| **Vercel/Netlify**       | Nej, inte utan ändringar. | Gratisnivå finns.                            | Environment variables   | Nej/Ja*    | Ja, mycket            |

\* Nej för statisk sida, ja för serverless-proxy.

## Motivering

Render passar bäst nu eftersom det är gratis och redan fungerar med vår image och vårt GitHub-
och GHCR-flöde. Dockerfile, app, nginx, API och miljövariabler är portabla.
Ett byte kostar främst tid för nya inställningar av image, nyckel, deploy och URL.

## Konsekvenser

Staging: Vi accepterar kallstart, gratisnivå och personligt konto.

Produktion: Vi accepterar inte kallstart eller personligt konto. Vi behöver betald drift och teamåtkomst.

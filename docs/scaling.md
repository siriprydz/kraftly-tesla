# Skalning – Kraftly Mina sidor

## Vad vi vet om trafiken

**(40 000 kunder/mån, topparna: fakturadagen, elprisnyheter, Norge i vår. Vad betyder det i anrop per minut i värsta fall? Gissa, men skriv ner gissningen.)**

Vi antar att 25 % av månadens 40 000 kunder, alltså 10 000, är aktiva under en topp. Om 10 % av dem gör ett API-anrop under samma minut blir det 1 000 anrop/minut.

## Vad vi mätte

Kommandon som kördes 25 september 2026:

1. `npx autocannon -c 50 -d 10 http://localhost:8080/`
2. `npx autocannon -c 50 -d 10 http://localhost:8080/assets/index-SfjUMmcG.js`
3. `npx autocannon -c 50 -d 10 http://localhost:8080/api/user`
4. Test mot staging: `npx autocannon -c 10 -d 10 https://kraftly-tesla-staging.onrender.com/`

| Anrop                  | Req/s (avg) | p99   | Kommentar |
| ---------------------- | ----------- | ----- | --------- |
| GET /                  | 42,337.46   | 14 ms |           |
| GET /assets/index-*.js | 47,477.82   | 18 ms |           |
| GET /api/user          | 331.7       | 23 ms |           |
| Mot staging (-c 10): … | 222         | 62 ms |

## Vad siffrorna säger

I det lokala testet var API-anropet den långsammaste av de tre vägarna: `/api/user` klarade 331,7 req/s med p99 23 ms, jämfört med drygt 42 000–47 000 req/s och p99 14–18 ms för frontendfilerna. Det pekar ut API-vägen som flaskhals i just den här mätningen.

Vi antar att 25 % av månadens 40 000 kunder, alltså 10 000, är aktiva under en topp. Om 10 % av dem gör ett API-anrop under samma minut blir det 1 000 anrop/minut, cirka 17 req/s i genomsnitt. Det är ungefär en tjugondel av den genomströmning vi mätte lokalt mot mock-API:t.

## Vad vi gjorde

1. **Cache-headers (bevis under M5 i milestones.md). Vad sparar det per återkommande användare?**

   Stagingkontrollen med `curl -sI` visar att hashade filer under `/assets/` cachas i ett år och att `index.html`, `config.js` och `version.txt` återvalideras. Vid återbesök slipper webbläsaren hämta den oförändrade JavaScript-filen igen, vlket sparar tid för användaren.

2. **CDN: nu / senare / aldrig, och vad som krävs för att lägga till det.**

   Senare, om mätningar visar att trafiken till statiska filer belastar webbservern. Då krävs CDN-konfiguration, DNS/domänkoppling och test av cache- och uppdateringsregler.

3. **Fler instanser: vid vilken siffra?**

   Föreslagen utlösare är CPU över 70 % i minst fem minuter under förväntad topplast, efter att detta kan följas i drift. Det är en starttröskel att verifiera, inte en gräns som våra nuvarande belastningstester har bevisat.

4. **Det vi inte kan påverka (API:et), och vad vi säger till backend-teamet.**

   Vi ber backend-teamet bekräfta kapacitet och rate limits samt dela svarstider och fel vid toppbelastning, inklusive kallstart. Vår lokala mätning gäller mock-API:t och räcker inte för att fastställa produktions-API:ets kapacitet.

## Varför (inte) Kubernetes

Vi gjorde inte övning 2B. Kubernetes är användbart om man har många användare och därför behöver kapacitet från flera containrar av appen. För oss räcker det med vår enda container med det antal kunder vi har nu. Kubernetes innebär också mer konfiguration och drift att lära sig och underhålla, vilket hade varit en onödig kostnad utan egentlig vinning i Kraftly-projektet.

## När stänger man en flagga i stället för att rulla tillbaka?

|                     | Feature flag                                                                                                                                                                                        | Rollback                                                                                                    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Tar                 | Inte mätt; beror på hur flaggan ändras och slår igenom                                                                                                                                              | 33s                                                                                                         |
| Påverkar            | en funktion för användarna                                                                                                                                                                          | potentiellt hela relseasen                                                                                  |
| Passar när          | felet är isolerat till featuren i flaggan och därför kan lösas genom att slå av flaggan.                                                                                                            | När något blivit fel efter en ny deploy och man inte vet exakt hur det ska lösas eller vad som orsakat det. |
| Regeln vi enats om: | Rollbacks är standard när något blivit fel, om vi inte vet EXAKT vad som är fel och det går snabbt att fixa i en ny deploy. Feature flags används om problemet är isolerat till featuren i flaggan. |

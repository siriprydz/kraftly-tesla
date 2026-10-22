# Hållbarhet och etik

## Siffrorna

Uppmätt med `scripts/co2.mjs` (co2.js 0.19.0, Sustainable Web Design-modellen v4), 2026-10-22.

|                     | kB per besök | g CO2e per besök (SE) | kg CO2e per månad (SE) | kg CO2e per månad (globalt) |
| ------------------- | -----------: | --------------------: | ---------------------: | --------------------------: |
| Före M7 (taggen M6) |        6 882 |                 0,408 |                   52,3 |                       126,9 |
| Efter M7 (main)     |          274 |                 0,016 |                    2,1 |                         5,1 |

## Metoden och vad vi inte räknar

Scriptet räknar med 40 000 kunder x 3,2 sessioner per kund och månad = 128 000 besök:

Vi behåller den siffran då den känns som ett rimligt antagande: man loggar in en gång när fakturan kommer, och sedan kanske ett par gånger till för att hålla koll på förbrukning etc och speciella tillfällen som adressändring.

Skriptet mäter filerna i `dist/` (`index.html` + allt under `assets/`, även lazy views) okomprimerat och räknar varje besök som ett första besök med tom cache. Siffran är alltså en övre gräns: i verkligheten komprimeras filerna med gzip/brotli och återbesök hämtar det mesta ur cachen. Elen för driften räknas med svensk elmix (35,89 g CO2e/kWh), medan tillverkningen av enheter, nät och datacenter alltid räknas med SWD v4:s globala snitt (494 g CO2e/kWh). Modellen räknar bara överförda bytes, så den ser inte hur mycket processorkraft JavaScript kräver i telefonen för att till exempel att rita förbruknings-diagrammet, inte API-anropen och servern bakom dem, och inte om vår hosting drivs med förnybar el.

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

## Etikfall: Chatta med Kraftly

**Situationen.**

Vi föreslår att AI:n får tillgång till så lite kunddata som möjligt och inte läser kundens elförbrukning. I stället kan den vägleda kunden till var informationen finns i appen. På så sätt får kunden hjälp utan att AI:n behöver ta del av förbrukningsuppgifterna, vilket gör datahanteringen tydligare. Eftersom fakturan redan bygger på timdata finns uppgifterna i våra system och kan visas direkt för kunden i appen.

**Vårt beslut.**

Ja, men bara under förutsättning att AI:n inte får tillgång till kunddata. I nuläget har vi inte tillräcklig kontroll över hur uppgifterna behandlas, och vi inhämtar inte kundernas samtycke till att dela dem med en AI-modell.

**Varför.**

Vårt resonemang utgår från GDPR:s princip om ändamålsbegränsning: personuppgifter ska bara användas för tydligt angivna ändamål. I nuläget använder vi uppgifter om elanvändning för att ta fram kundernas fakturor. Principen om uppgiftsminimering innebär att vi inte ska dela fler uppgifter med AI:n eller externa aktörer än vad som behövs. Vi behöver också skydda uppgifterna enligt principen om integritet och konfidentialitet.

Innan vi eventuellt låter AI:n behandla kunduppgifter behöver vi säkerställa att det finns en rättslig grund och att kunderna får tydlig information om hur uppgifterna används, i linje med principerna om laglighet, korrekthet och öppenhet. I nuläget har vi inte inhämtat kundernas samtycke till att använda uppgifter om elanvändning för andra ändamål än fakturering. Kunden kan dessutom förvänta sig att det som skrivs i chatten används för att besvara frågan, inte delas vidare eller används för andra ändamål.

**Vad vi gör i stället / villkor.**

Istället för att låta AI-chatten få tillgång till datan, så låter vi den guidea användaren till var den kan hitta informationen själv. På så sätt används bara datan på det sätt som kraftlys kunder redan godkänt: i fakturaframtagningen. På så sätt har vi kontroll över datan och delar inte vidare den till tredje part.

# Beslut: feature flags

**Datum:** 2026-09-28

**Skriv beslutet i en mening: hur slår Kraftly på och av funktioner per miljö?**

Vi styr funktioner per miljö med flaggor som kan slås på och av i Render.

## Bakgrund

**Norge-expansionen ska finnas i staging, men inte synas för kunder. Vad krävde det?**

Det krävde att vi la in en miljövariabel för flaggan på stagingen i Render, med värdet "true". Produktionsmiljön har inte variabeln och då syns inte featuren.

## Alternativ vi jämförde

| Alternativ                            | Hur                                   | Bryter mot "bygg en gång"?               | Nackdel                                                                    |
| ------------------------------------- | ------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| Långlivad branch                      | Norge-koden hålls i en egen branch.   | Ja, miljöerna får olika kod.             | Brancherna kan glida isär.                                                 |
| Byggtidsflagga (`VITE_…`)             | Flaggan byggs in i appen.             | Ja, varje miljö behöver ett eget bygge.  | Ändringar kräver nytt bygge och deploy.                                    |
| Körtidsflagga (`config.js` vid start) | Containern skriver flaggan vid start. | Nej, samma image används i alla miljöer. | Flaggan måste ställas in per miljö. Ändringar kräver omstart eller deploy. |

## Motivering

**Varför valde vi det här alternativet? Fokusera på principen "bygg en gång".**

Vi valde körtidsflagga för att staging och produktion ska använda samma image men visa olika funktioner.

## Konsekvenser

**Vad kostar lösningen? När ska flaggan tas bort och vem ansvarar för det?**

Lösningen kräver att vi håller flaggan rätt inställd i varje miljö. Det kan bli stökigt med många flaggor om lanserad kod inte städas bort. När Norge-funktionen har lanserats och inte längre behöver en separat flagga ansvarar den som lade till flaggan för att ta bort den och tillhörande kod och tester. Arbetet kan delegeras, men ansvaret ligger kvar hos den personen.

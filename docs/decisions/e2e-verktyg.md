# Beslut: verktyg för E2E-tester

**Datum:** 2026-08-28
**Beslut:** Vi använder Cypress för end-to-end-tester.

## Bakgrund
Vi behöver ett E2E-smoketest i CI (M2) och vill kunna mocka API:et.
Teamet kan Cypress sedan tidigare. Playwright utvärderades idag.

## Vad vi såg (era observationer – inte tutorialens)
| | Cypress | Playwright |
|---|---|---|
| Tid till första gröna test |några sek| några sek|
| Hur man hittar element | CSS-selektorer| placeholder och roll|
| Mockning av nätverk |den använder cy.intercept | den använder page.route |
| Väntan / flakiness | Vi observerade ingen flakiness och testen gick fort| Vi observerade ingen flakiness och testen gick fort|
| Felmeddelanden | Allt blev grönt inga felmeddelanden| Allt blev grönt inga felmeddelanden|

## Motivering
Vi gillar cypress UI:t och vi känner oss mer bekväma med det då vi har jobbat med det tidigare.

## Konsekvenser
Om vi byter från cypress till playwright kommer vi behöva byta hela testsviten och desto längre vi väntar desto dyrare blir bytet.
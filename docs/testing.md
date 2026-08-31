# Teststrategi – Kraftly Mina sidor

## Karta: vad testas var

| Del av portalen            | Nivå (enhet / komponent / E2E) | Varför just där?                                                                                                             | Finns test idag? |
| -------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Prisformattering           | Enhet                          | Endast logik/en funktion                                                                                                     | Nej              |
| Förnamn i hälsning         | Enhet                          | Endast logik/en funktion                                                                                                     | Nej              |
| Fakturastatus (förfallen?) | Enhet                          | Endast logik/en funktion                                                                                                     | Nej              |
| Validering flyttanmälan    | Enhet                          | Endast logik/en funktion                                                                                                     | Nej              |
| StatusChip                 | Komponent                      | Komponenten (men inte hela appen) måste renderas för att testet ska köras.                                                   | Nej              |
| Flyttanmälans formulär     | Komponent                      | Den söker efter något på skärmen så något måste renderas.                                                                    | Nej              |
| Förbrukningsdiagrammet     | Komponent                      | Den kan testas isolerat. Chart måste renderas.                                                                               | Nej              |
| Stores (user, consumption) | Enhet                          | Enhetstest, eftersom vi vill testa hur logiken funkar (med ett mockat API), inte hur den visas i UI i en komponent eller vy. | Nej              |
| API-klienten (api.js)      | Enhet                          | Innehåller flera separata funktioner som vi kan testa med enhetstest eftersom inget renderas.                                | Nej              |
| Inloggningsflödet          | E2E                            | Överskrider fler sidor                                                                                                       | Nej              |
| Navigation mellan sidor    | E2E                            | Överskrider fler sidor                                                                                                       | Nej              |
| … era egna tillägg         |                                |                                                                                                                              | Nej              |

## Regler

1. **Hur mockar vi API:et?** Modulmock (vi.mock) i komponenttester, riktigt mock-API i E2E, eller något annat? En regel, inte per test.
   - Enhet & komponent (Vitest): `vi.mock` på `services/api` (stores, vyer) eller mockad `fetch` (`api.js`). Fejkade svar ska vara deterministiska dvs samma varje gång vi kör testerna.
   - E2E (Cypress): riktigt mock-API (`npm run api` mot localhost:4000). Ingen `vi.mock`.
2. **Vad krävs för att en PR ska få mergas** när det gäller test? _Alla gröna_ är självklart. Måste ny logik ha nytt test? Måste en buggfix ha ett regressionstest? (Facits svar: ja på det senare – och det är en bra regel.)
   - Alla tester måste vara gröna innan merge
   - Ja, ny logik måste ha ett nytt test
   - Ja, en buggfix måste ha ett regressionstest
3. **Täckningskrav – ja eller nej?** Ett vanligt reflexval är "80 % coverage". Vad garanterar det faktiskt? Vad garanterar det inte? Bestäm er, och skriv varför.
   - "80 % coverage" garanterar att 80% av koden exekveras under testkörningen. Det garanterar inte att koden gör rätt sak eller har hög kvalitet. Den garanterar bara att så många av kodraderna har testats här. Typ "Kod existerar här". Därför är det bättre att inte sätta ett hårt täckningskrav. Vi prioriterar tester baserat på kvalitet över kvantitet och vad de tillför. T.ex. att vi prioriterar att göra affärskritiska tester.
4. **Namngivning & placering.** *.test.js bredvid koden eller i tests/? Testnamn på svenska eller engelska? (Koden är på engelska. Testnamn läses av människor – bestäm.)
   - När samma team gör både kod och tester, är det rimligt att ha tester och kodfiler i samma mapp, så gör vi också. Vi använder engelska genomgående i hela projektet, förutom sådant som renderas i UI såklart.

## Vad vi medvetet inte testar

**Vad testar vi inte, och varför?** (Chart.js? CSS? Routerns interna beteende?)

- Vi testar inte sådant som kan ändras när koden refaktorieras. T.ex. CSS. Vi testar inte heller att externa bibliotek funkar eftersom vi räknar med att de testar dem själva. Vi testar inte routerns beteende eftersom det är inbyggd funktionalitet i vue router som inte vi skrivit.

## Kommandon

`npm test` · `npm run test:run` · (`npm run cy:open`)

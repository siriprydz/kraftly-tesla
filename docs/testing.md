# Teststrategi – Kraftly Mina sidor

## Karta: vad testas var

### Enhet

| Område                     | Motivering                                | Test? | Testfil                                                     |
| -------------------------- | ----------------------------------------- | ----- | ----------------------------------------------------------- |
| Prisformattering           | Endast logik/en funktion                  | Ja    | `src/utils/format.test.js`                                  |
| Förnamn i hälsning         | Endast logik/en funktion                  | Ja    | `src/utils/user.test.js`                                    |
| Fakturastatus (förfallen?) | Endast logik/en funktion                  | Ja    | `src/utils/invoice.test.js`                                 |
| Validering flyttanmälan    | Endast logik/en funktion                  | Ja    | `src/utils/validateMove.test.js`                            |
| Stores (user, consumption) | Logik med mockat API, inte UI             | Ja    | `src/stores/user.test.js`, `src/stores/consumption.test.js` |
| API-klienten (`api.js`)    | Flera separata funktioner, inget renderas | Ja    | `src/services/api.test.js`                                  |

### Komponent

| Område                 | Motivering                                                                                            | Test? | Testfil                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | ----- | ----------------------------------------- |
| StatusChip             | Ingen egen komponent — `<span class="status-chip">` i `InvoicesView`. Status-text testas via vy-test. | Ja    | `src/views/InvoicesView.test.js`          |
| Flyttanmälans formulär | Söker efter element på skärmen                                                                        | Ja    | `src/views/MoveFormView.test.js`          |
| Förbrukningsdiagrammet | Chart måste renderas, kan testas isolerat                                                             | Ja    | `src/components/ConsumptionChart.test.js` |

### E2E

| Område                  | Motivering             | Test? | Testfil                      |
| ----------------------- | ---------------------- | ----- | ---------------------------- |
| Inloggningsflödet       | Överskrider fler sidor | Ja    | `cypress/e2e/smoke.cy.js`    |
| Navigation mellan sidor | Överskrider fler sidor | Ja    | `cypress/e2e/invoices.cy.js` |

## Regler

### 1 · Hur mockar vi API:et?

Modulmock (`vi.mock`) i komponenttester, riktigt mock-API i E2E — en regel, inte per test.

- **Enhet & komponent (Vitest):** `vi.mock` på `services/api` (stores, vyer) eller mockad `fetch` (`api.js`). Fejkade svar ska vara deterministiska.
- **E2E (Cypress):** riktigt mock-API (`npm run api` mot localhost:4000). Ingen `vi.mock`.

### 2 · Vad krävs för att en PR ska få mergas?

Alla tester måste vara gröna innan merge.

- Ny logik måste ha ett nytt test.
- En buggfix måste ha ett regressionstest.

### 3 · Täckningskrav – ja eller nej?

Nej. "80 % coverage" garanterar bara att så många kodrader exekveras — inte att koden gör rätt sak eller har hög kvalitet. Vi prioriterar kvalitet över kvantitet och fokuserar på affärskritiska tester.

### 4 · Namngivning & placering

`*.test.js` ligger bredvid koden, inte i en separat `tests/`-mapp. Testnamn och kod skrivs på engelska; UI-text som renderas för användaren är på svenska.

## Vad vi medvetet inte testar

- **CSS** — kan ändras vid refaktorering utan att beteendet ändras.
- **Externa bibliotek** (t.ex. Chart.js) — vi litar på att de testas av sina egna maintainers.
- **Routerns interna beteende** — inbyggd funktionalitet i Vue Router som vi inte skrivit.

## Kommandon

| Kommando           | Syfte               |
| ------------------ | ------------------- |
| `npm test`         | Vitest i watch-läge |
| `npm run test:run` | Vitest en gång (CI) |
| `npm run cy:open`  | Cypress interaktivt |

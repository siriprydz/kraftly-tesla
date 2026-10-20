# Tillgänglighet

_Mål: WCAG 2.2 nivå AA. Kontrollerat med axe i komponenttesterna, Storybooks Accessibility-flik och en genomgång med tangentbordet. Storybook och axe körs lokalt (i pipelinen: M9)._

## Tangentbordsgenomgång

**Så testar vi:** `npm run api` + `npm run dev`, musen undan. Gå igenom varje vy med Tab, Shift+Tab, Enter och mellanslag i Chrome.

**Efter:** Gör samma genomgång när spåren är mergade och fyll i kolumnen Efter i båda tabellerna.

| Vy             | Vad ni testade                                                                                   | Före                                                                                                                                                                                                | Efter                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inloggning     | Tab genom sidan; logga in med Enter. Syns fokus på fält och knapp?                               | Går att logga in men måste tabba till knappen logag in, kan inte bara trycka enter i t ex lösenordsfältet                                                                                           | Bristen finns kvar men står med under kända brister. Planeras fixas.                                                                                          |
| Översikt       | Syns fokus? Nås **Fler spartips**? Var står fokus direkt efter inloggningen?                     | Ingen fokus, så omöjligt att se var man är i navigationen. Verkar inte vara fokuserat på något från start. kan bara loopa runt i naven, omöjligt att komma vidare och interagera med sidorna i sig. | Fokusring syns tydligt vid tabbning. Det går nu att ta sig igenom sidorna också och komma ur nav-loopen                                                       |
| Fakturor       | Tab genom sidan och fakturatabellen; syns fokus; nås länkar/knappar (t.ex. visa/ladda ner)?      | Kommer inte ut ur nav-baren, så nej.                                                                                                                                                                | Det går nu att tabba igenom alla klickbara element i fakturatabellen. Med skärmläsare kan man gå igenom alla celler och men hör vilken column/rad den tillhör |
| Flyttanmälan   | Tab genom formuläret; syns fokus; kan alla fält och skicka-knappen nås och aktiveras?            | Syns bara genom blinkade text-start grej, ingen fokus på själva fälten/knapparna                                                                                                                    | Tydlig fokuresing och går att tabba till. Dock måste man loopa klart igenom naven först. Känd brist som planeras fixas vid tillfälle.                         |
| Mina uppgifter | Tab genom sidan; syns fokus; nås alla fält och knappar?                                          | Samma som ovan                                                                                                                                                                                      | Samma som ovan                                                                                                                                                |
| Utloggning     | Tab till **Logga ut** i menyn; aktivera med Enter/mellanslag; hamnar ni på inloggningen?         | Kommer inte åt logga ut med tab                                                                                                                                                                     | Utloggning finns nu med i navigeringsloopen och nås med tab                                                                                                   |
| Navigation     | Tab genom topmenyn (Översikt, Fakturor, Flyttanmälan, Mina uppgifter) mellan vyerna; syns fokus? | Ingen fokus syns, ser endast liten text hint vilken urls man är på nere i vänstra hörnet av webläsaren.                                                                                             | Fokus syns.                                                                                                                                                   |

## HTML och tabeller

Kolla `<html lang>`, sidtiteln i `index.html`, och om tabellrubriker har `scope="col"` (rubriken gäller hela kolumnen under).

| Kontroll                  | Var                          | Vad ni kollar                            | Före            | Efter                                              |
| ------------------------- | ---------------------------- | ---------------------------------------- | --------------- | -------------------------------------------------- |
| `<html lang>`             | `index.html`                 | Värde (t.ex. `sv` / `en`)?               | en              | sv                                                 |
| Sidtitel (`<title>`)      | `index.html`                 | Text – beskriver portalen för användare? | Vite App        | Mina Sidor - Kraftly                               |
| `scope` på tabellrubriker | `src/views/InvoicesView.vue` | Har `<th>` attributet `scope="col"`?     | Nej, inga scope | Scope Col på alla th och Visually hidden för gömda |

## Komponentbiblioteket

| Komponent | Ersätter                                                                                                                        | API                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `KButton` | BaseButton, AppButton och element som beter sig som en knapp, oavsett om de hade button som element eller var "falska knappar". | `variant`: primary · secondary · text · inactivated, `type`, `block`, texten är en slot |

```npm run storybook    # komponenterna med stories, fliken Accessibility
npm run test:a11y    # axe-testerna (filerna *.a11y.test.js)
```

## Vad vi åtgärdade

| Brist                                            | Var                       | Hittades med                                              | Åtgärd (PR)                                                                                              |
| ------------------------------------------------ | ------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Fälten hade bara placeholder, inget riktigt namn | `LoginView.vue`           | Kodläsning + `getByLabelText` (axe godkänner placeholder) | [https://github.com/siriprydz/kraftly-tesla/pull/72](https://github.com/siriprydz/kraftly-tesla/pull/72) |
| Fälten saknade både label och placeholder        | `ProfileView.vue`         | axe-regeln `label`                                        | [https://github.com/siriprydz/kraftly-tesla/pull/72](https://github.com/siriprydz/kraftly-tesla/pull/72) |
| Logotypen saknade alt-text                       | `LoginView.vue`           | axe-regeln `image-alt`                                    | [https://github.com/siriprydz/kraftly-tesla/pull/72](https://github.com/siriprydz/kraftly-tesla/pull/72) |
| Smoke-testet letade efter fält via placeholder   | `cypress/e2e/smoke.cy.js` | Placeholders borttagna                                    | [https://github.com/siriprydz/kraftly-tesla/pull/72](https://github.com/siriprydz/kraftly-tesla/pull/72) |

## Vad axe inte hittar

Title - Axe ser att det finns en titel och godkänner, bryr sig inte om vad Titeln är.

Lang - Axe ser att lang finns, men bryr sig inte om ifall det matchar med det faktiska språket eller inte. Märktes tydligt med skärmläsaren.

Scope=col på tableheaders - axe godkänner att det saknas eftersom skärmläsaren oft gissar rätt i en enkel tabell

Knappnamn - Axe letar bara efter att ett namn finns, men bryr sig inte om ifall alla har samma namn.

Endast placeholder i fält - Axe säger OK, men placeholder försvinner så fort man börjar skriva

## Kända brister

Otydligt felmeddelande för datum i flyttanmälan - ingen indikation om datumet är för sent eller för tidigt, och texten är densamma som hinten i botten av formuläret.

Inloggning - använderen måste tabba till logga in knappen, kan inte bara trycka enter från lösenfältet.

Fokus hamnar inte automatiskt på H1 vid ruttbyte, användaren måste använda sig av ctrl+opt+cmd+H (mac) för att ta sig till första Headern på sidan, annars stannar tabbningen kvar i naven.

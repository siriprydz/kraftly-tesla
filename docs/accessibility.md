# Tillgänglighet

## Tangentbordsgenomgång

**Så testar vi:** `npm run api` + `npm run dev`, musen undan. Gå igenom varje vy med Tab, Shift+Tab, Enter och mellanslag.

**Efter:** Gör samma genomgång när spåren är mergade och fyll i kolumnen Efter i båda tabellerna.

| Vy             | Vad ni testade                                                                                   | Före                                                                                                                                                                                                | Efter |
| -------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Inloggning     | Tab genom sidan; logga in med Enter. Syns fokus på fält och knapp?                               | Går att logga in men måste tabba till knappen logag in, kan inte bara trycka enter i t ex lösenordsfältet                                                                                           | …     |
| Översikt       | Syns fokus? Nås **Fler spartips**? Var står fokus direkt efter inloggningen?                     | Ingen fokus, så omöjligt att se var man är i navigationen. Verkar inte vara fokuserat på något från start. kan bara loopa runt i naven, omöjligt att komma vidare och interagera med sidorna i sig. | …     |
| Fakturor       | Tab genom sidan och fakturatabellen; syns fokus; nås länkar/knappar (t.ex. visa/ladda ner)?      | Komme rinte ut ur nav-baren, så nej.                                                                                                                                                                | …     |
| Flyttanmälan   | Tab genom formuläret; syns fokus; kan alla fält och skicka-knappen nås och aktiveras?            | Syns bara genom blinkade text-start grej, ingen fokus på själva fälten/knapparna                                                                                                                    | …     |
| Mina uppgifter | Tab genom sidan; syns fokus; nås alla fält och knappar?                                          | Samma som ovan                                                                                                                                                                                      | …     |
| Utloggning     | Tab till **Logga ut** i menyn; aktivera med Enter/mellanslag; hamnar ni på inloggningen?         | Kommer inte åt logga ut med tab                                                                                                                                                                     | …     |
| Navigation     | Tab genom topmenyn (Översikt, Fakturor, Flyttanmälan, Mina uppgifter) mellan vyerna; syns fokus? | Ingen fokus syns, ser endast liten text hint vilken urls man är på nere i vänstra hörnet av webläsaren.                                                                                             | …     |

## HTML och tabeller

Kolla `<html lang>`, sidtiteln i `index.html`, och om tabellrubriker har `scope="col"` (rubriken gäller hela kolumnen under).

| Kontroll                  | Var                          | Vad ni kollar                            | Före            | Efter |
| ------------------------- | ---------------------------- | ---------------------------------------- | --------------- | ----- |
| `<html lang>`             | `index.html`                 | Värde (t.ex. `sv` / `en`)?               | en              | …     |
| Sidtitel (`<title>`)      | `index.html`                 | Text – beskriver portalen för användare? | Vite App        | …     |
| `scope` på tabellrubriker | `src/views/InvoicesView.vue` | Har `<th>` attributet `scope="col"`?     | Nej, inga scope | …     |

# AI i utvecklingsflödet

## Vad vi kopplade in

Vi kopplade in en AI-granskning för PR. Den körs varje gång en PR skapas eller uppdateras. Nyckeln (ANTHROPIC_API_KEY) ligger i GitHub Secrets, inte i repot. AI:n har bara rätt att läsa diffen och kommentera i PR:en. Den får inte ändra koden. Den ligger inte som required då svaren inte är deterministiska och den kan ha fel. Många saker den upptäcker är inte värda att stoppa en PR för. En ny push till samma PR avbryter den pågående checken för att inte bränna tokens i önödan. AI-granskningen triggas inte på forks.

### Första riktiga PR:en:

**PR:** [https://github.com/siriprydz/kraftly-tesla/pull/82](https://github.com/siriprydz/kraftly-tesla/pull/82)
**Tid:** 36s
**Tokens:** 5976 in, 1600 ut (claude-opus-5-5, stop_reason: end_turn)

## Utvärdering

Claude Opus 5.5 22-27 oktober 2026

| PR                                                                                                          | Punkten i några ord                                                                                                                 | Träff / miss / oavgjord | Varför                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [https://github.com/siriprydz/kraftly-tesla/pull/82](https://github.com/siriprydz/kraftly-tesla/pull/82)36s | Felmeddelandet (`<p v-if="error">`) dyker upp först efter att formuläret skickats, men har varken `role="alert"` eller `aria-live`. | träff                   | Den har rätt, dock låg prio, och ett bra exemplet på varför den inte ska kunna blocka en PR.                                                                              |
| [https://github.com/siriprydz/kraftly-tesla/pull/84](https://github.com/siriprydz/kraftly-tesla/pull/84)40s | **MoveFormView.vue – kontrollen som stoppar inskickning har försvagats.**                                                           | Träff                   | Ändringen hade försvagat kontrollen så att fel utanför `FIELD_ORDER` inte stoppade anmälan. Inget testfall fångade det. Vi återställde kontrollen och lade till ett test. |
| https://github.com/siriprydz/kraftly-tesla/pull/83 28s                                                      | Hittade inget fel.                                                                                                                  | Träff                   | Vi hittade heller inget fel och AI:n gav ingen false positive.                                                                                                            |
| https://github.com/siriprydz/kraftly-tesla/pull/85 40s                                                      | Null eller undefined läses upp av skärmläsaren istället för att säga att den saknar värde.                                          | Träff                   | Detta stämde. En uppdatering gjordes utefter detta och ett test lades till.                                                                                               |

Totalt: 4 punkter på 4 PR:ar – 4 träffar, 0 missar, 0 oavgjorda.

## Två exempel

### Träff:

[#82](https://github.com/siriprydz/kraftly-tesla/pull/82) – KField i flyttanmälan

**Vad som hittades:** Felmeddelandena i flyttanmälan var kopplade till fälten, men lästes bara upp när fältet fick fokus. När valideringen misslyckades stod fokus kvar på skicka-knappen, så en skärmläsare gav ingen signal om att något var fel. Det upptäcktes inte av axe.

**Vad vi gjorde:** I [#84](https://github.com/siriprydz/kraftly-tesla/pull/84) flyttas fokus till det första ogiltiga fältet, och skärmläsaren läser då upp fältet och felet. Tester kontrollerar var fokus hamnar.

[#85](https://github.com/siriprydz/kraftly-tesla/pull/85) – ConsumptionChart

**Vad som hittades:** AI-granskaren identifierade ett edge case i `ConsumptionChart`: om ett värde var `null` eller `undefined` läste skärmläsaren upp just det ordet. Det kan bli svårt för användaren att förstå.

**Vad vi gjorde:** Vi uppdaterade PR:en med en ny commit, så att skärmläsaren i stället säger ”data saknas” för sådana värden.

### Miss:

N/A

## Vår regel

**När vi litar på kommentaren:** Vi litar på kommentaren när vi läst igenom den och själva utvärderat problemet den påstår finns, om det stämmer och om det är relevant.

**När vi inte håller med:** Skulle vi inte hålla med så svarar vi på kommentaren med motivering varför. Vi väljer att inte prioritera att svara på absolut allt, då det känns som ett jobb som inte alltid skulle upprätthållas och möjligtvis kunna leda till slarviga kommentarer som görs bara för att.

**För stora diffar:** Vi försöker i första hand undvika att hamna där genom att hålla våra PR:ar små och specifika. Skulle det dock hända ändå så faller vi tillbaka på endast manuell PR-check.

**Om modellen byts:** Just nu vet vi inte om modellen byts om vi inte läser igenom varje logg i GitHub Actions vid PR, inget syns i kommentaren från granskningen. Vi överväger att vid senare tillfälle uppdatera `scripts/ai-review.mjs` så att modellbytet skrivs ut i kommentaren, genom att byta ut:

```js
if (fallback)
  console.error(`Reservmodell: ${fallback.from?.model} avböjde, ${fallback.to?.model} svarade.`)
```

mot:

```js
if (fallback) say(`\n_Reservmodell svarade: ${fallback.to?.model}._`)
say(`\n_Modell: ${response.model}_`)
```

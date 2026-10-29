# Beslut

Ett dokument per beslut, i mallen Datum · Beslut · Bakgrund · Alternativ · Motivering · Konsekvenser.
De tre viktigaste för den som tar över är tokenlagring, hosting och feature flags.

| Nr  | Beslut                                                              | Datum                 | Status |
| --- | ------------------------------------------------------------------- | --------------------- | ------ |
| 1   | [Verktyg för E2E-tester](e2e-verktyg.md)                            | 2026-08-28            | gäller |
| 2   | [Var staging körs](hosting.md)                                      | 2026-09-21            | gäller |
| 3   | [Norge-stödet bakom en feature flag](feature-flags.md)              | 2026-09-28            | gäller |
| 4   | [Access token i minnet, refresh i httpOnly-cookie](tokenlagring.md) | 2026-10-05            | gäller |
| 5   | [Rendering: SPA, inte SSR](rendering.md)                            | 2026-20-12            | gäller |
| 6   | [Grenstrategi – trunk-based med squash merge](grenstrategi.md)      | 2026-10-29 (togs v.1) | gäller |

## Beslut som saknar eget dokument

- **Komponentbibliotek:** Vi bygger egna `KButton` och `KField` i stället för att använda ett färdigt komponentbibliotek ([komponentbiblioteket](../accessibility.md)).
- **AI-granskning av pull requests:** AI:n får kommentera men inte ändra kod, och granskningen är inte blockerande. Teamet bedömer själv om varje kommentar är relevant ([AI i utvecklingsflödet](../ai-in-pipeline.md)).
- **AI-chatten:** Den får inte tillgång till kunddata, utan vägleder kunden till informationen i appen ([etikfallet Chatta med Kraftly](../sustainability.md)).

## Vilka tre beslut som är viktigast – och varför just de

1. [Access token i minnet, refresh token i httpOnly-cookie](tokenlagring.md): Det påverkar inloggning och säkerhetsarbetet. Den som ändrar auth-flödet behöver förstå hur det hänger ihop och varför teamet valt som vi valt.
2. [Staging på Render](hosting.md): Det är den konkreta driftvägen i dag. Staging använder gratisnivån och kan få kallstart. Produktion ska däremot ha betald drift och teamåtkomst. En ny teammedlem som ska arbeta med Deploy och hemligheter behöver förstå miljöerna och hur de hänger ihop.
3. [Norge-stödet bakom en feature flag](feature-flags.md): Staging och produktion använder samma byggda image, men runtime-flaggan styr om funktionen visas. Den som ändrar miljökonfigurationen behöver förstå hur detta fungerar.

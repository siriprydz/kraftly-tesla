# Milestones

## M0

- [x] Teamrepo skapat från starter-templaten, med skyddad `main` (PR krävs + minst en godkänd review), PR-mall och CODEOWNERS
- [x] Working agreement i README: mötestider, kommunikationsvägar, definition of done för PR:er, tech lead-schema för rotationen
- [x] Appen körs lokalt hos alla i teamet
- [x] Skuldinventering i `docs/debt.md`
- [x] Kort logg i `docs/log.md`: vad ni gjorde, vad som var svårt

## M5

- Vi har inte fått några issues från det andra teamet

### Vad vi har gjort:

- [x] Produktion skild från staging
- [x] Godkännande före prod
- [x] Norge-stödet bakom en feature flag. **Bevis**:

```
siriprydz@MacBook-Pro-2 kraftly-tesla % curl https://kraftly-tesla-staging.onrender.com/config.js
window.__KRAFTLY__ = {
env: 'staging',
features: { norway: true }

siriprydz@MacBook-Pro-2 kraftly-tesla % curl https://kraftly-tesla.onrender.com/config.js
window.__KRAFTLY__ = {
env: 'production',
features: { norway: false }
}
```

- [x] Beslutsdokument
- [x] Cache-headers konfigurerade och verifierade. **Bevis:**
  - Före:

```
PS /Users/siriprydz/Documents/Chas_Academy/kurser/Avancerad frontendutveckling/grupparbete/kraftly-tesla> curl -sI https://kraftly-tesla-staging.onrender.com/assets/index-SfjUMmcG.js | grep -i -E "cache-control|etag"
etag: W/"6ab52acb-5fb3d"
PS /Users/siriprydz/Documents/Chas_Academy/kurser/Avancerad frontendutveckling/grupparbete/kraftly-tesla> curl -sI https://kraftly-tesla-staging.onrender.com/ | grep -i -E "cache-control|etag"
etag: W/"6ab52acb-232"
PS /Users/siriprydz/Documents/Chas_Academy/kurser/Avancerad frontendutveckling/grupparbete/kraftly-tesla> curl -sI https://kraftly-tesla-staging.onrender.com/config.js | grep -i -E "cache-control|etag"
etag: W/"6ab618d2-28"
PS /Users/siriprydz/Documents/Chas_Academy/kurser/Avancerad frontendutveckling/grupparbete/kraftly-tesla> curl -sI https://kraftly-tesla-staging.onrender.com/version.txt | grep -i -E "cache-control|etag"
etag: W/"6ab52acb-29"
```

- Efter:

```
PS /Users/siriprydz/Documents/Chas_Academy/kurser/Avancerad frontendutveckling/grupparbete/kraftly-tesla> curl -sI https://kraftly-tesla-staging.onrender.com/assets/index-DkJRA7eI.js | grep -i -E "cache-control|etag"
cache-control: public, max-age=31536000, immutable
etag: W/"6ab6286b-5fe4b"
PS /Users/siriprydz/Documents/Chas_Academy/kurser/Avancerad frontendutveckling/grupparbete/kraftly-tesla> curl -sI https://kraftly-tesla-staging.onrender.com/ | grep -i -E "cache-control|etag"
cache-control: no-cache
etag: W/"6ab6286b-232"
PS /Users/siriprydz/Documents/Chas_Academy/kurser/Avancerad frontendutveckling/grupparbete/kraftly-tesla> curl -sI https://kraftly-tesla-staging.onrender.com/config.js | grep -i -E "cache-control|etag"
cache-control: no-cache
etag: W/"6ab62dd3-48"
```

- [x] Rollback. **Bevis:**
  - Länk till körning: https://github.com/siriprydz/kraftly-tesla/actions/runs/36425587458
  - Tid från "run workflow" till färdig rollback: 33s
  - Norgekortet försvann, etersom det var commitat till den senare builden.
  - Flaggan som är inlagd som en miljövariabel i Render backades inte. En databas hade inte heller återställts av den här rollbacken.
  - Om vi valt production hade vi behövt ett godkännade i github från någon annan än den som gjorde rollbacken. I vårt fall har vi dock gjort så att samma person som gjorde deployen får godkänna, för att Siri skulle kunna göra det jälv när Elin var borta.
- [x] docs/scaling.md med spår 3:s siffror
- [x] Beslutsdokumentet docs/decisions/feature-flags.md.
- [x] Adresserna

## M7

### Vad vi har gjort:

- [x] Mätmetoden står skriven: verktyg och inställningar i docs/performance.md (produktionsbygget, enhetsläge, nätverksstrypning, cache av, median av flera körningar) – samma för före och efter
- [x] Minst tre optimeringar med före/efter-mätning i docs/performance.md, varav minst en som förbättrar LCP eller CLS på dashboarden och minst en som minskar mängden JavaScript. Varje optimering har en egen PR, länkad i dokumentet
- [x] Dashboarden inom gränserna: LCP under 2,5 s och CLS under 0,1 (lokalt produktionsbygge, iPhone 12 Pro, Fast 4G, cache av) – siffrorna i dokumentet
- [x] Prestandabudget i CI: lighthouserc.json med minst LCP, CLS och JavaScript-storlek som "error", och jobbet Prestandabudget (Lighthouse) körs på varje PR. Länk till en grön körning i docs/milestones.md
- [x] Budgeten stoppar: jobbet är en required status check på main, och publish väntar på det (needs). JavaScript-taket ligger strax över er faktiska siffra, motiverat i dokumentet
- [x] Testerna gröna – och om ni bytt import av ett bibliotek som mockas i testerna, är mocken flyttad med (inga getContext-fel i testloggen)
- [x] Ett beslutsdokument docs/decisions/rendering.md: SPA, SSR (Nuxt) eller SSG för portalen – jämförelse, beslut, och när beslutet ska omprövas

## M8

### Vad vi har gjort:

- [x] Gemensamma komponenter extraherade: EN Button-komponent (KButton) ersätter alla tre varianter och div-knapparna. Inga BaseButton, AppButton, .btn eller .button-secondary kvar, och inget element med @click som inte är en knapp eller länk
  - **Inventering före ändringen:**
    | Var                               | Kod                                                                               |
    | --------------------------------- | --------------------------------------------------------------------------------- |
    | `src/App.vue:12`                  | `<span class="logout" @click="logout">Logga ut`                                   |
    | `src/components/BaseButton.vue:3` | `<button class="btn"><slot /></button>`                                           |
    | `src/components/AppButton.vue:7`  | `// TODO merge with BaseButton some day`                                          |
    | `src/components/AppButton.vue:9`  | `name: 'AppButton',`                                                              |
    | `src/views/ProfileView.vue:12`    | `<AppButton color="#12b76a" @click="save">Spara ändringar`                        |
    | `src/views/ProfileView.vue:13`    | `<button class="button-secondary" style="margin-left: 10px" @click="reset">Ångra` |
    | `src/views/ProfileView.vue:20`    | `import AppButton from '../components/AppButton.vue'`                             |
    | `src/views/LoginView.vue:8`       | `<button class="btn" style="width: 100%" @click="handleLogin">Logga in`           |
    | `src/views/DashboardView.vue:50`  | `<div class="btn" style="margin-top: 12px" @click="showTips">Fler spartips`       |
    | `src/views/InvoicesView.vue:20`   | `<div class="download" @click="downloadInvoice(invoice)">Ladda ner`               |
    | `src/views/MoveFormView.vue:37`   | `<BaseButton @click="submit">Skicka flyttanmälan`                                 |
    | `src/views/MoveFormView.vue:48`   | `import BaseButton from '../components/BaseButton.vue'`                           |
  - **Bevis:** inga äldre knappvarianter hittas; grep avslutas med kod 1 när sökningen saknar träffar.
    ```text
    grep -rn "BaseButton\|AppButton\|button-secondary\|class=\"btn" src --include="*.vue"; echo "exit: $?"
    exit: 1
    ```

- [x] Labels, fokusstilar, kontrast och lang åtgärdade: varje fält har en kopplad label (inte bara placeholder), fokus syns vid Tab överallt (:focus-visible, ingen outline: none kvar), text klarar 4,5:1, . Även alt-texter och fakturatabellens scope. + id räcker – KField är inte ett krav i M8
- [x] Storybook lokalt med stories för KButton och de gemensamma komponenter ni ändrar i M8: npm run storybook startar, npm run build-storybook lyckas, och Accessibility-fliken visar Violations 0 på varje story
  - **Bevis:** sista raden från `npm run build-storybook`.
    ```text
    Storybook build completed successfully
    ```
  - **Stories:**
    - `StatusChip`: Betald, Obetald, Förfallen
    - `KButton`: Primär, Sekundär, Text, Inaktiverad

- [x] axe-tester gröna lokalt: ett *.a11y.test.js för KButton och ett för inloggningen (axe + getByLabelText); `npm run test:a11y` och `npm run test:run` gröna. Klistra in sista raderna ur körningen.
  - **Bevis:**
    ```text
    npm run test:a11y

    Test Files  3 passed (3)
         Tests  8 passed (8)
      Start at  10:39:55
      Duration  1.12s (transform 141ms, setup 433ms, import 577ms, tests 291ms, environment 1.73s)

    npm run test:run

    Test Files  16 passed (16)
         Tests  77 passed (77)
      Start at  10:40:26
      Duration  2.43s (transform 824ms, setup 3.02s, import 2.94s, tests 1.52s, environment 12.57s)
    ```
- [x] Tangentbordsnavigering verifierad, dokumenterad i docs/accessibility.md: varje vy genomgången med bara tangentbordet, före och efter, med resultat per vy

## M9

### Vad vi har gjort:

- [x] Komponentbiblioteket i pipelinen: KField (label obligatorisk, useId(), aria-describedby för hjälptext och fel, aria-invalid) används i inloggning, profil och flyttanmälan, med story (Violations 0) och test · ett jobb Storybook i ci.yml (npm run build-storybook, artefakt), required check
  - **KField:** `src/components/KField.vue` - `label` är `required: true`, id från `useId()`, `aria-describedby` pekar på hjälptext och fel, `aria-invalid` när fältet har fel.
  - **Används i:** `LoginView.vue`, `ProfileView.vue` och `MoveFormView.vue`.
  - **Story:** `src/components/KField.stories.js` - Standard, Med hjälptext, Med fel. Violations 0 i Accessibility-fliken.
  - **Test:** `src/components/KField.a11y.test.js`.
    ```text
    npm run test:a11y

    Test Files  5 passed (5)
         Tests  17 passed (17)

    npm run test:run

    Test Files  18 passed (18)
         Tests  88 passed (88)
    ```
  - **Jobbet Storybook:** i `.github/workflows/ci.yml` - kör `npm run build-storybook` och laddar upp `storybook-static` som artefakt. Grönt på `main`: [körning för #84](https://github.com/siriprydz/kraftly-tesla/actions/runs/39934870952).
  - **Required check:** Storybook står bland de obligatoriska kontrollerna för `main`, tillsammans med quality, build, e2e, Image → GHCR och Prestandabudget (Lighthouse).

- [x] Ett AI-steg i pipelinen, utvärderat på riktiga PR:ar: ai-review.yml + scripts/ai-review.mjs postar granskningspunkter som kommentar, som förslag, aldrig required check. Utvärdering på minst tre av teamets riktiga PR:ar: tabellen träff / miss / oavgjord, två exempel (en träff, en miss, med citat) och regeln (när ni litar på den, vad ni gör när ni inte håller med) – allt i ett dokument, docs/ai-in-pipeline.md
  - **Filerna:** `.github/workflows/ai-review.yml` och `scripts/ai-review.mjs`. Nyckeln `ANTHROPIC_API_KEY` ligger i GitHub Secrets.
  - **Första kommentaren:** [#82](https://github.com/siriprydz/kraftly-tesla/pull/82).
  - **Inte required:** jobbet AI-granskning (förslag) körs på varje PR men står inte bland de obligatoriska kontrollerna för `main` (se listan ovan).
  - **Utvärdering, exempel och regel:** [docs/ai-in-pipeline.md](./ai-in-pipeline.md) - 4 PR:ar (#82, #83, #84, #85): 4 träffar, 0 missar, 0 oavgjorda.

- [x] Hållbarhetssiffran kopplad till M7 + ett etikfall: docs/sustainability.md med tabellen Före M7 / Efter M7 i kB per besök → kg CO2e per månad med scripts/co2.mjs (co2.js, Sustainable Web Design-modellen, svensk elmix, 40 000 kunder i månaden, antagandena utskrivna), tre meningar om metoden och vad som inte räknas · ett etikfall, "Chatta med Kraftly": situationen, ert beslut, varför, villkor
  - **Siffrorna:** [docs/sustainability.md](./sustainability.md), uppmätt med `npm run co2`.
    |                     | kB per besök | kg CO2e per månad (SE) |
    | ------------------- | -----------: | ---------------------: |
    | Före M7 (taggen M6) |        6 882 |                   52,3 |
    | Efter M7 (main)     |          274 |                    2,1 |
  - **Antaganden:** 40 000 kunder × 3,2 sessioner = 128 000 besök per månad, varje besök som ett första besök, svensk elmix 35,89 g CO2e/kWh.
  - **Etikfallet "Chatta med Kraftly":** i samma dokument, med situationen, beslutet, varför och villkoren.

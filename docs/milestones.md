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

#### Lista över alla knappar och allt som beter sig som en, innan de byttes ut till en och samma komponent:

| Var                               | Kod                                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| `src/App.vue:12`                  | ` <span class="logout" @click="logout">Logga ut`                                   |
| `src/components/BaseButton.vue:3` | ` <button class="btn"><slot /></button>`                                           |
| `src/components/AppButton.vue:7`  | `// TODO merge with BaseButton some day`                                           |
| `src/components/AppButton.vue:9`  | ` name: 'AppButton',`                                                              |
| `src/views/ProfileView.vue:12`    | ` <AppButton color="#12b76a" @click="save">Spara ändringar`                        |
| `src/views/ProfileView.vue:13`    | ` <button class="button-secondary" style="margin-left: 10px" @click="reset">Ångra` |
| `src/views/ProfileView.vue:20`    | `import AppButton from '../components/AppButton.vue'`                              |
| `src/views/LoginView.vue:8`       | ` <button class="btn" style="width: 100%" @click="handleLogin">Logga in`           |
| `src/views/DashboardView.vue:50`  | ` <div class="btn" style="margin-top: 12px" @click="showTips">Fler spartips`       |
| `src/views/InvoicesView.vue:20`   | ` <div class="download" @click="downloadInvoice(invoice)">Ladda ner`               |
| `src/views/MoveFormView.vue:37`   | ` <BaseButton @click="submit">Skicka flyttanmälan`                                 |
| `src/views/MoveFormView.vue:48`   | `import BaseButton from '../components/BaseButton.vue'`                            |

#### Bevis på att det nu bara är Kbutton som används:

grep -rn "BaseButton\|AppButton\|button-secondary\|class=\"btn" src --include="*.vue"; echo "exit: $?"
exit: 1

- [ ] Labels, fokusstilar, kontrast och lang åtgärdade: varje fält har en kopplad label (inte bara placeholder), fokus syns vid Tab överallt (:focus-visible, ingen outline: none kvar), text klarar 4,5:1, <html lang="sv">. Även alt-texter och fakturatabellens scope. <label for> + id räcker – KField är inte ett krav i M8
- [ ] Storybook lokalt med stories för KButton och de gemensamma komponenter ni ändrar i M8: npm run storybook startar, npm run build-storybook lyckas, och Accessibility-fliken visar Violations 0 på varje story
- [ ] axe-tester gröna lokalt: ett *.a11y.test.js för KButton och ett för inloggningen (axe + getByLabelText); npm run test:a11y och npm run test:run gröna. Klistra in sista raderna ur körningen
- [ ] Tangentbordsnavigering verifierad, dokumenterad i docs/accessibility.md: varje vy genomgången med bara tangentbordet, före och efter, med resultat per vy

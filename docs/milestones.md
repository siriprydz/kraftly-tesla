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

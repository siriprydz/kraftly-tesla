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

- [x] Rollback
  - Länk till körning:https://github.com/siriprydz/kraftly-tesla/actions/runs/36425587458
  - Tid från "run workflow" till färdig rollback: 33s
  - Norgekortet försvann, etersom det var commitat till den senare builden.
  - Flaggan som är inlagd som en miljövariabel i Render backades inte. En databas hade inte heller återställts av den här rollbacken.
  - Om vi valt production hade vi behövt ett godkännade i github från någon annan än den som gjorde rollbacken. I vårt fall har vi dock gjort så att samma person som gjorde deployen får godkänna, för att Siri skulle kunna göra det jälv när Elin var borta.

### Vad vi har kvar:

- [] docs/scaling.md med spår 3:s siffror.
- [] Beslutsdokumentet docs/decisions/feature-flags.md.

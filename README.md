![CI](https://github.com/siriprydz/kraftly-tesla/actions/workflows/ci.yml/badge.svg)

# kraftly-mina-sidor

Kundportal för Kraftly. Originalet levererades av Webbmakarna AB 2026-06-30. Tesla har tagit över och byggt vidare.

## Staging

https://kraftly-tesla-staging.onrender.com

## Production

https://kraftly-tesla.onrender.com

## Getting started

Kräver **Node 22** .

Kopiera miljövariablerna (en gång, filen committas inte):

```bash
cp .env.example .env
```

### Utan Docker

Kör mock-API:t och Vite i **två terminaler**. Båda processerna fortsätter köra, så den andra startar aldrig om de står i samma terminal.

Terminal 1:

```bash
npm install
npm run api
```

Terminal 2:

```bash
npm run dev
```

Öppna http://localhost:5173.

### Med Docker

Docker Desktop måste vara installerat **och igång** på din dator. Port 8080 ska vara ledig.

```bash
docker compose up --build
```

Öppna http://localhost:8080.

### Hur du vet att det fungerar

Logga in med ett av testkontona. Du ska se översikten med **Hej Anna!** eller **Hej Bo!** plus förbrukning och tre kort.

| Kund           | E-post                     | Lösenord     |
| -------------- | -------------------------- | ------------ |
| Anna Andersson | anna.andersson@example.com | kraftly-anna |
| Bo Bergström   | bo.bergstrom@example.com   | kraftly-bo   |

Fungerar det inte: kolla att `.env` finns (kopierad från `.env.example`) och att du öppnat rätt adress.

## Dokumentation

| Fil                      | Svarar på                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `docs/architecture.md`   | Vad pratar med vad, var kör det, lagren i frontend                                              |
| `docs/decisions/`        | Varför – ett dokument per beslut (hosting, tokenlagring, feature flags, rendering, e2e-verktyg) |
| `docs/deploy.md`         | Hur en ändring når staging och prod, var hemligheterna bor, rollback                            |
| `docs/pipeline.md`       | Vad som krävs för att merga, vad man gör när `main` är röd                                      |
| `docs/readiness.md`      | Checklistan _Produktionsfärdig app_ med status per rad                                          |
| `docs/known-issues.md`   | Vad som är känt trasigt eller medvetet ogjort                                                   |
| `docs/containers.md`     | Hur man kör i Docker, image-storlek, hur browsern når API:t                                     |
| `docs/testing.md`        | Vad som testas var                                                                              |
| `docs/security.md`       | Inloggningen, OWASP-genomgången och kända säkerhetsbrister                                      |
| `docs/performance.md`    | Hur vi mäter, optimeringarna, budgeten i CI                                                     |
| `docs/accessibility.md`  | Komponentbiblioteket, tangentbordsgenomgången och kända a11y-brister                            |
| `docs/ai-in-pipeline.md` | AI-granskningen och vår regel för den                                                           |
| `docs/sustainability.md` | CO2-siffran och etikfallet                                                                      |
| `docs/scaling.md`        | Trafikantaganden och hur vi skalar                                                              |
| `docs/contrast.md`       | Kontrastmätningar före och efter färgbyten                                                      |
| `docs/log.md`            | Vad vi gjorde, vad som var svårt                                                                |
| `docs/milestones.md`     | Milstolparna och bevisen                                                                        |
| `docs/debt.md`           | Skulden vi tog över från startkoden                                                             |

| Fråga                                                                | Var svaret står                              |
| -------------------------------------------------------------------- | -------------------------------------------- |
| Hur startar jag appen lokalt, och hur vet jag att den fungerar?      | README, _Getting started_                    |
| Var bor hemligheterna, och hur får jag dem?                          | `docs/deploy.md`                             |
| Hur kommer en ändring till produktion – och hur rullar man tillbaka? | `docs/deploy.md`                             |
| Varför ser arkitekturen ut så här – var finns besluten?              | `docs/architecture.md` och `docs/decisions/` |
| Vad är känt trasigt eller medvetet ogjort?                           | `docs/known-issues.md`                       |

## Working Agreement

### Teach Lead Agreement

- Tech lead v 1-6 – Siri
- Tech lead v 7-12 – Elin

### Workflow

- Jobba i Github projects: backlog, redo, pågående, review och klart
- Skapa issues/tickets
- En branch per issue som man döper efter issue-typ, t.ex. `issue/123`, `fix/123` osv
- Fyll i PR-mallen innan man skickar PR
- Minst en annan person måste godkänna PR

### Git Workflow

- Pull alltid med git pull --ff-only för att undvika onödiga merge-commits
- Skapa en ny branch för varje feature/fix: feature/kort-beskrivning eller fix/kort-beskrivning
- Författaren av koden Squash:ar och merge:ar efter godkänd PR

### Guidelines för branchnamn

- feature/123-add-login
- fix/145-handle-empty-email
- chore/161-update-dependencies
- docs/172-api-setup-guide
- refactor/180-extract-payment-service

### Guidelines för commits

Vi vill hålla projekthistoriken ren och lättläst. Följ dessa regler när du skriver dina commit-meddelanden:

- Skriv alltid på engelska.
- Använd imperativ (nutidsform som ett kommando/uppmaning).
- Rätt: Add login feature eller Fix bug in sidebar
- Fel: Added login feature (dåtid) eller Fixes bug in sidebar (tredje person)
- Håll det kort

### Guidelines

- Huvudsaklig kommunikation sker via discord-gruppchatten.
- Informera gruppen. T.ex. förvarna i frånvaro-chatten om du inte kommer vara aktiv den dagen.
- Kolla discord varje dag
- Gör dina standups
- Håll deadlines
- Säg till om något inte känns bra

### Coding guidelines

#### Vi använder ESLint med följande princip:

- error = fångar faktiska buggar (typkonvertering, scope-problem) → blockerar PR
- warn = teknisk skuld / debug-rester → syns men blockerar inte utveckling

Detta låter oss iterera snabbt utan att kompromissa med korrekthet.

#### Vi använder Prettier med följande princip:

- Vi kör utan semikolon på slutet av rader, eftersom JavaScript ändå fattar var raden slutar. Vi använder enkla citattecken ('text') istället för dubbla, bara för att det ser renare ut. Rader får vara lite längre än standard, upp till 100 tecken, eftersom de flesta jobbar på breda skärmar nuförtiden. Vi sätter alltid ett kommatecken efter sista raden i listor och objekt, så att man slipper onödiga ändringar i Git när man lägger till en ny rad. Vi använder samma typ av radbrytning (LF) oavsett om man kodar på Mac, Windows eller Linux, så att filerna inte skiljer sig åt beroende på vem som skrev dem. Och i Vue-filer låter vi script- och style-delarna vara oindragna, så de ser ut som vanliga JS-filer.

### Schema

#### Standups

- Skriftlig standup varje dag utom torsdag

#### Möten

- Måndag: kl 13–16 på plats i skolan
- Tisdag: kl 9 – oklart, på plats i skolan

### Standup-mall

Mall för standups görs varje vardag skriftligt:

- Vad gjorde du igår?
- Vad gör du idag?
- Har du några blockers?

På fredagar kör vi dessutom mini-retro:

- Vad gick bra? (Keep)
- Vad gick mindre bra? (Stop)
- Vad ska vi testa/förbättra till nästa gång? (Start)

### Code Review-process

Vi har två typer av reviews beroende på ändringens omfattning:

#### Mindre feedback

(t.ex. typos, mindre justeringar)

- Reviewern gör ändringen direkt i GitHub under granskningen och godkänner PR:n direkt. Den som skapat pull requesten ansvarar sedan för att merga

#### Större ändringar

(kräver omarbetning)

- Reviewern nekar pull requesten med "Request changes" och beskriver vad som behöver ändras. Den som skapat pull requesten gör därefter ändringarna på samma branch och pushar upp det uppdaterade förslaget till samma pull request för en ny granskning

#### Tumregel för mindre vs större ändring

- Påverkar logik, funktionalitet eller struktur → större ändring
- Stavning, formatering, kommentarer eller mindre kosmetiska justeringar → mindre ändring

#### Vid osäkerhet

- Fråga i PR-kommentaren eller ta upp det direkt med den som skapat pull requesten

#### Svarstid

Reviews besvaras inom 24 timmar (arbetsdagar).

#### Godkännande

1 godkännande krävs innan merge är tillåten.

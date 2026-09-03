[![CI](https://github.com/suzan-al-majdalawi/kraftly-ci-siri-suzan/actions/workflows/ci.yml/badge.svg)](https://github.com/suzan-al-majdalawi/kraftly-ci-siri-suzan/actions/workflows/ci.yml)

# kraftly-mina-sidor

Customer portal for Kraftly. Delivered by Webbmakarna AB 2026-06-30.

## Getting started

```bash
npm install
npm start
```

> TODO: write proper documentation

## Working Agreement

### Teach Lead Agreement

- Tech lead v 1-3 – Siri
- Tech lead v 4–6 – Mia
- Tech lead v 7-9 –Jakob
- Tech lead v 10-12 – Elin

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

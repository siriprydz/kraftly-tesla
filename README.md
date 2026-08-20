# kraftly-mina-sidor

Customer portal for Kraftly. Delivered by Webbmakarna AB 2026-06-30.

## Getting started

```bash
npm install
npm start
```

> TODO: write proper documentation

## Working Agreement

### Workflow

- Jobba i Github projects: backlog, redo, pågående, review och klart
- Skapa issues/tickets
- En branch per issue som man döper efter issue-typ, t.ex. `issue/123`, `fix/123` osv
- Fyll i PR-mallen innan man skickar PR
- Minst en annan person måste godkänna PR

### Guidelines för branchnamn

- feature/123-add-login
- fix/145-handle-empty-email
- chore/161-update-dependencies
- docs/172-api-setup-guide
- refactor/180-extract-payment-service

### Guidelines

- Informera gruppen. T.ex. förvarna i frånvaro-chatten om du inte kommer vara aktiv den dagen.
- Kolla discord varje dag
- Gör dina standups
- Håll deadlines
- Säg till om något inte känns bra

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

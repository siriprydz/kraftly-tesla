# Skuldinventering

M0: skulden i startkoden. Kryssen är status 2026-10-29, inte hur det såg ut då. Det som fortfarande är öppet och spelar roll för en användare eller för drift står i [known-issues.md](known-issues.md).

- [x] Api-nyckel ligger öppen i repo i filen api.js — nyckeln kommer från `API_KEY` / Render, se [deploy.md](deploy.md#api-nyckeln)
- [x] Inloggning är bara en localStorage-flagga, ingen JWT/session eller servervalidering — access token i minnet, refresh i httpOnly-cookie, [tokenlagring.md](decisions/tokenlagring.md)
- [ ] Mock-API autentiserar inte, tar emot tom body och ger alltid 200. CORS är öppen för allt — kvar lokalt, [known-issues.md](known-issues.md)
- [x] .env är inte med i gitignore och .env-example saknas — `.env` i `.gitignore`, `.env.example` finns
- [x] README säger `npm start` men scriptet finns inte (bara `dev` och `api`). Frontend och mock-API måste köras som två processer — [README.md](../README.md#getting-started)
- [x] Inloggning funkar inte: ingen validering, ingen felhantering och ingen loading-state — om API:t inte körs händer ingenting — felmeddelande i `LoginView`, 401 från API:t
- [x] E-postfältet är `type="text"` — `type="email"` i `LoginView` och `ProfileView`
- [ ] Fakturanedladdning och "Fler spartips" är bara alert/console.log, inte riktiga funktioner — [known-issues.md](known-issues.md)
- [x] Mycket console-log och gamla kommentarer — det mesta borta; några `console.log` kvar (nedladdning, resize, mock-API)
- [x] Mixad stil i koden — Prettier + ESLint i pre-commit
- [x] Ingen pipeline och ingen deployprocess — [pipeline.md](pipeline.md), [deploy.md](deploy.md)
- [x] Inga tester — `npm run test:run`, [testing.md](testing.md)
- [x] 3 olika knappimplementationer under components, onödigt med 3 olika knappar — `KButton` / `KField`, [milestones.md](milestones.md#m8)
- [x] Hero-bild är 6,5 MB, för stor — `src/assets/hero.webp`, [performance.md](performance.md)
- [x] Hela lodash-biblioteket importeras bara för en debounce — egen `src/utils/debounce.js`
- [ ] Ingen TypeScript — medvetet, inte DoD
- [x] Dålig tillgänlighet: fokusmarkering borttagen, formulärfält saknar label — [accessibility.md](accessibility.md). Kvar som inte var M0: [known-issues.md](known-issues.md)
- [ ] Inline styles — finns kvar i bl.a. `LoginView`, `MoveFormView`, `ProfileView`
- [ ] Glömt lösneords-funktion saknas — [known-issues.md](known-issues.md)
- [ ] Lägg till automatisk scanning av beroenden och säkerhetsuppdateringar (dependabot / renovatebot/ etc) — [known-issues.md](known-issues.md)

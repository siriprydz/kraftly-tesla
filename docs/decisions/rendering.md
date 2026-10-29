# Beslut: rendering

**Datum:** 2026-20-12
**Beslut:** Vi fortsätter rendera kraftlys prtal som SPA

## Jämförelse

| Fråga                              | SPA                                                                 | SSR                                                                    | SSG                                                                           |
| ---------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| När skapas HTML?                   | I browsern vid varje besök. JS bygger sidan efter `index.html`.     | På servern vid varje besök. HTML skickas färdig per request.           | Vid build, en gång. Färdig HTML genereras för valda routes.                   |
| Vilken typ av sida passar det för? | Appar bakom inloggning (dashboard, kunddata från API). Som Kraftly. | Publika sidor där innehållet ändras ofta och ska vara unikt per besök. | Publika sidor som sällan ändras (t.ex. login/marketing) och kan pre-renderas. |
| Syns innehåll före JavaScript?     | Nej. `curl` visar mest tom `#app`; resten kräver JS.                | Ja, markup finns i första HTML-svaret.                                 | Ja för prerenderade sidor. Dynamisk data efter login som i SPA.               |
| Drift                              | Statiska filer + nginx (som i dag), ingen renderings-server.        | Node (eller serverless) som måste köra och skalas vid trafik.          | Statiska filer + nginx, som SPA men med tyngre build vid varje deploy.        |

## Motivering

### Ska sidan hittas eller delas?

Nej. Just nu finns inget innehåll förutom login för den som inte redan har ett konto och är inloggad. Om publika sidor skulle skapas i framtiden, med tex marknadsföring eller liknande för att locka nya kunder, så kan det byggas om vid senare tillfälle.

### Syns den innan man loggat in?

Nej. Använadere som inte är inloggade routas automatiskt till /login. Inget annat innehåll är synligt innan man loggat in.

### Är vi beredda att drifta en server?

Nej, inte för frontend i det här läget. Det skulle krävas mycket arbete för obefintlig vinning i det här stadiet.

## Konsekvenser

Beslutet kring redering skulle kunna komma att omprövas om Kraftlys portal växer bortom bara existerande kundportal och fler sidor med information eller marknadsföring till potentiella nya kunder skulle tillkomma. Skulle det hända vill vi optimera för SEO och se till att Kraftlys portal plockas upp ordertnligt av crawlers.

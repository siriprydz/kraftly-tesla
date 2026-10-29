# Beslut: trunk-based development med squash merge

**Datum:** 2026-10-29 · **Beslut:** Vi arbetar trunk-based med kortlivade feature-grenar, skyddad `main` och squash merge via pull request.

Efterhandsskrivet v. 11 – beslutet togs i vecka 1.

## Bakgrund

Vi behöver ett gemensamt arbetssätt som gör det enkelt att integrera kod ofta och upptäcka konflikter tidigt. Långa, separata utvecklingslinjer ökar risken för att kod och beslut glider isär innan de möts.

## Alternativ vi jämförde

|                      | Trunk-based development                                                                                                    | GitFlow                                                                                                                         |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Vad som skiljer dem  | Korta feature-grenar integreras ofta i `main`.                                                                             | Långlivade brancher för utveckling, release och akuta fixar.                                                                    |
| Pris, drift och risk | Kräver små PR:ar och fungerande tester. Frekventa integrationer minskar risken för stora konflikter, men kräver disciplin. | Mer administration för att hålla brancher synkade. Ger tydliga releaser, men brancher kan glida isär och konflikter bli större. |

## Motivering

Vi valde trunk-based eftersom täta integrationer håller ändringarna små och minskar risken för svåra mergekonflikter. GitFlow kan vara användbart när releaser kräver flera långlivade versioner, men här skulle dess extra brancher och överföringar skapa mer administration än nytta.

## Konsekvenser

- `main` skyddas med branch protection: ändringar går via pull requests och kräver godkännande och godkända status checks. Reglerna gäller även tech lead, vilket minskar risken för misstag och gör att samma kvalitetskrav gäller för alla.
- Feature-grenar hålls kortlivade och uppdateras ofta. Små pull requests blir lättare att förstå och granska.
- Conventional commits gör att namngivningen blir enhetlig.
- Vid squash merge slås feature-grenens commits ihop till en commit i `main`, vanligtvis en per pull request. Det ger en mer lättläst huvudhistorik och gör en ändring enklare att hitta eller återställa. Nackdelen/en kostnad är att de enskilda mellanliggande committerna inte finns kvar som separata commits i `main`.

- **Omprövas om** teamet börjar hantera flera långlivade produktversioner eller om releasekraven gör att separata release-brancher behövs.

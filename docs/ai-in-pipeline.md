# AI i utvecklingsflödet

## Vad vi kopplade in

<Vad steget gör, när det körs, var nyckeln ligger, varför det inte är en required check.
Första riktiga PR:en: #… – tid från push till kommentar: …. Kostnad per granskning: ….>

## Utvärdering

Claude Opus 5.5 22-27 oktober 2026

| PR                                                                                                          | Punkten i några ord                                                                   | Träff / miss / oavgjord | Varför                                                                                       |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------- |
| [https://github.com/siriprydz/kraftly-tesla/pull/82](https://github.com/siriprydz/kraftly-tesla/pull/82)36s | `v`Felmeddelandet (`<p v-if="error">`) dyker upp först efter att formuläret skickats, | träff                   | Den har rätt, dock låg prio, och ett bra exemplet på varför den inte ska kunna blocka en PR. |

Totalt: … punkter på … PR:ar – … träffar, … missar, … oavgjorda.

## Två exempel

### Träff:

>

<Vad som var rätt, och vad ni gjorde.>

### Miss:

>

<Vad som var fel, och varför modellen trodde det.>

## Vår regel

<När litar ni på kommentaren? Vad gör ni när ni inte håller med – svarar på kommentaren med varför?
Vad gör ni med en diff som är för stor? Vad gör ni om modellen byts?>

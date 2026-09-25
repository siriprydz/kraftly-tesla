// Feature flags. Värdena kommer från config.js, som containern skriver vid start
// (public/config.js när du kör npm run dev). En flagga som inte finns är av.
//
// Regeln: en flagga läses ALLTID härifrån, aldrig direkt från window i en komponent.
// Då finns det ett ställe att söka på när flaggan ska bort.
export const isEnabled = (name) => window.__KRAFTLY__?.features?.[name] === true

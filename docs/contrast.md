# Kontrast

**Krav:** minst 4,5:1 för vanlig text (WCAG AA).

## Storybook

**Så mäter vi:** `npm run storybook`, öppna storyn, fliken **Accessibility** → **Violations** → **Color contrast**.

| Story                | Färg på bakgrund       | Före (förhållande) | Violations före | Ny färg   | Efter (förhållande) | Violations efter |
| -------------------- | ---------------------- | ------------------ | --------------- | --------- | ------------------- | ---------------- |
| StatusChip/Betald    | `#12b76a` på `#ecfdf3` | 2.48               | 1               | `#067647` | 5.39                | 0                |
| StatusChip/Obetald   | `#e35d6a` på `#fff1f0` | 3.16               | 1               | `#b42318` | 5.97                | 0                |
| StatusChip/Förfallen | `#b42318` på `#ffe6e6` | 5.54               | 0               | No change | 5.54                | 0                |

## Browsern

**Så mäter vi:** `npm run api` + `npm run dev`, högerklicka på texten → **Inspektera** → klicka på färgrutan vid `color` i Styles → **Contrast ratio**.

| Var                                      | Färg på bakgrund       | Före (förhållande) | Ny färg   | Efter (förhållande) |
| ---------------------------------------- | ---------------------- | ------------------ | --------- | ------------------- |
| `.hint` – Inloggning                     | `#b8c0cf` på `#ffffff` | 1.82               | `#5c6679` | 5.78                |
| `.stat-label` – Översikt                 | `#7c8698` på `#ffffff` | 3.67               | `#5c6679` | 5.78                |
| `.field-label` – Mina uppgifter          | `#7c8698` på `#ffffff` | 3.67               | `#5c6679` | 5.78                |
| Kvittotext – Flyttanmälan                | `#12b76a` på `#ffffff` | 2.62               | `#067647` | 5.69                |
| Knappen Spara ändringar – Mina uppgifter | `#ffffff` på #2f54eb   | 5.85               | No change | 5.85                |

import NorwayNotice from './NorwayNotice.vue'

// Flaggan läses från window.__KRAFTLY__ (config.js, M5). beforeEach sätter den och städar efteråt.
const withFlag = (on) => () => {
  window.__KRAFTLY__ = { env: 'storybook', features: { norway: on } }
  return () => delete window.__KRAFTLY__
}

export default { title: 'Komponenter/NorwayNotice', component: NorwayNotice, tags: ['autodocs'] }

export const FlagganPa = { name: 'Flaggan på', beforeEach: withFlag(true) }
export const FlagganAv = { name: 'Flaggan av (visar ingenting)', beforeEach: withFlag(false) }

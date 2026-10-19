// Storybook för Kraftly: komponenterna en och en, utan att starta appen eller API:t.
// Storybook läser vite.config.js själv – Vue-pluginen och allt annat följer med.

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-docs', // Docs-sidan per komponent (tags: ['autodocs'] i storyn)
    '@storybook/addon-a11y', // fliken Accessibility: axe körs mot storyn i browsern
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  core: {
    disableTelemetry: true, // Storybook skickar annars anonym användningsstatistik
  },
}

export default config

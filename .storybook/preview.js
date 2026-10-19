import { setup } from '@storybook/vue3-vite'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import '../src/assets/styles.css' // samma globala stil som appen – annars ser komponenterna inte ut som i appen

// Vyerna använder Pinia och routern. I Storybook finns ingen riktig app runt dem, så vi ger
// varje story en egen store och en router som bara lever i minnet (ändrar inte adressfältet).
setup((app) => {
  app.use(createPinia())
  app.use(
    createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/:pathMatch(.*)*', component: { render: () => null } }],
    }),
  )
})

/** @type { import('@storybook/vue3-vite').Preview } */
const preview = {
  parameters: {
    controls: { expanded: true },
    a11y: {
      // 'todo' = visa felen i fliken Accessibility men stoppa inget. Att låta fel stoppa pipelinen är M9.
      test: 'todo',
    },
  },
}

export default preview

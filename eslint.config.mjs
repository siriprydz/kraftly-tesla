import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.{test,spec}.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node, ...globals.vitest },
    },
    rules: {
      'no-console': 'warn',
      'no-alert': 'warn',
      'no-var': 'error',
      eqeqeq: 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['cypress/**/*.js', 'cypress.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        cy: 'readonly',
        Cypress: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
      'no-alert': 'warn',
      'no-var': 'error',
      eqeqeq: 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-console': 'warn',
      'no-alert': 'warn',
      'no-var': 'error',
      eqeqeq: 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
  prettier,
]

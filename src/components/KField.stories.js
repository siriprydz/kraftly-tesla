import { ref } from 'vue'
import KField from './KField.vue'

export default {
  title: 'Komponenter/KField',
  component: KField,
  tags: ['autodocs'],
  // v-model i en story: ett eget ref, så att man kan skriva i fältet
  render: (args) => ({
    components: { KField },
    setup: () => ({ args, value: ref('') }),
    template: '<KField v-bind="args" v-model="value" />',
  }),
  args: { label: 'E-postadress', type: 'email', autocomplete: 'email' },
}

export const Standard = {}

export const MedHjalptext = {
  name: 'Med hjälptext',
  args: {
    label: 'Inflyttningsdatum',
    hint: 'Skriv som ÅÅÅÅ-MM-DD, t.ex. 2026-11-01',
    type: 'text',
  },
}

export const MedFel = {
  name: 'Med fel',
  args: {
    label: 'Postnummer',
    error: 'Postnummer ska vara fem siffror',
    type: 'text',
    inputmode: 'numeric',
  },
}

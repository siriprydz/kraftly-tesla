import KButton from './KButton.vue'

export default {
  title: 'Komponenter/KButton',
  component: KButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'text'] },
  },
  // Texten i knappen är en slot – render säger var den hamnar
  render: (args) => ({
    components: { KButton },
    setup: () => ({ args }),
    template: '<KButton v-bind="args">{{ args.label }}</KButton>',
  }),
  args: { label: 'Spara ändringar' },
}

export const Primar = { name: 'Primär', args: { variant: 'primary' } }
export const Sekundar = { name: 'Sekundär', args: { variant: 'secondary', label: 'Ångra' } }
export const Text = { args: { variant: 'text', label: 'Ladda ner' } }
export const Inaktiverad = { args: { disabled: true, label: 'Loggar in…' } }

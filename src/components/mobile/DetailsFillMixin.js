export default {
  props: {
    fill: {
      type: String,
      validator: value => [
        'neutral',
        'dark',
      ].includes(value),
      default: 'neutral',
    },
  },
};

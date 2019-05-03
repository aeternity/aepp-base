import copyToClipboard from 'copy-to-clipboard';

export default (el, binding) => {
  if (!('copyOnClick' in el.dataset)) {
    el.addEventListener('click', async () => {
      const value = el.dataset.copyOnClick;

      if (!value) return;

      if (!copyToClipboard(value)) return;
      el.classList.add('v-copied');
      setTimeout(
        () => el.classList.remove('v-copied'),
        500,
      );
    });
  }

  el.dataset.copyOnClick = binding.value; // eslint-disable-line no-param-reassign
};

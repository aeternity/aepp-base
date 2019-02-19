import copy from 'clipboard-copy';

export default (el, binding) => {
  if (!('copyOnClick' in el.dataset)) {
    el.addEventListener('click', async () => {
      const value = el.dataset.copyOnClick;

      if (!value) return;

      await copy(value);
      el.classList.add('v-copied');
      setTimeout(
        () => el.classList.remove('v-copied'),
        500,
      );
    });
  }

  el.dataset.copyOnClick = binding.value; // eslint-disable-line no-param-reassign
};

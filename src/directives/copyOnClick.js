import copyToClipboard from 'copy-to-clipboard';
import { i18n } from '../store/plugins/ui/languages';

export default (el, binding) => {
  if (!('copyOnClick' in el.dataset)) {
    el.addEventListener('click', async () => {
      const value = el.dataset.copyOnClick;

      if (!value) return;

      if (!copyToClipboard(value)) return;
      el.dataset.copiedText = i18n.t('copied'); // eslint-disable-line no-param-reassign
      el.classList.add('v-copied');
      setTimeout(() => el.classList.remove('v-copied'), 500);
    });
  }

  el.dataset.copyOnClick = binding.value; // eslint-disable-line no-param-reassign
};

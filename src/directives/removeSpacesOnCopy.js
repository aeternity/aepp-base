export default {
  inserted: (el) =>
    el.addEventListener('copy', (event) => {
      event.clipboardData.setData('text/plain', getSelection().toString().replace(/\s/g, ''));
      event.preventDefault();
    }),
};

const KEY = 'local-storage-call';

export const send = data => localStorage.setItem(KEY, data);

export const receive = () => new Promise((resolve) => {
  const storageHandler = ({ key }) => {
    if (key !== KEY) return;
    window.removeEventListener('storage', storageHandler);
    resolve(localStorage.getItem(KEY));
    localStorage.removeItem(KEY);
  };
  window.addEventListener('storage', storageHandler);
});

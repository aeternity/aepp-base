export default (address, mode = 'full') => {
  const chunks = address.match(/.{1,3}/g);
  switch (mode) {
    case 'full':
      return chunks.join(' ');
    case 'short':
      return `${chunks.slice(0, 2).join(' ')}···${address.slice(-3)}`;
    default:
      throw new Error(`Invalid mode: ${mode}`);
  }
};

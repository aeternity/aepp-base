if (process.env.IS_IOS) {
  const manifestLink = document.querySelector('link[rel=manifest]');
  manifestLink.href = manifestLink.href.replace('default', 'ios');
}

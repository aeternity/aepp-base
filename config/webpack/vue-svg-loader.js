module.exports = (svgContent) => {
  const svgEvents = svgContent.replace(
    '<svg',
    '<svg :class="[data.class, data.staticClass]" v-bind="data.attrs" v-on="listeners"',
  );
  return `<template functional>${svgEvents}</template>`;
};

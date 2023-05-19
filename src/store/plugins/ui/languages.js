/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
/* eslint-disable import/no-import-module-exports */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '../../../locales/en.json';

Vue.use(VueI18n);

const fallbackLocale = 'en';

export const i18n = new VueI18n({
  fallbackLocale,
  locale: fallbackLocale,
  messages: { en },
});

const languages = {
  en: {
    name: 'English',
    getMessages: () => import(/* webpackChunkName: "locale-en" */ '../../../locales/en.json'),
  },
  ru: {
    name: 'Русский',
    getMessages: () => import(/* webpackChunkName: "locale-ru" */ '../../../locales/ru.json'),
  },
  cn: {
    name: '中文',
    getMessages: () => import(/* webpackChunkName: "locale-cn" */ '../../../locales/cn.json'),
  },
  es: {
    name: 'Español',
    getMessages: () => import(/* webpackChunkName: "locale-es" */ '../../../locales/es.json'),
  },
};

export const fetchAndSetLocale = async (languageCode) => {
  if (!i18n.availableLocales.includes(languageCode)) {
    const messages = (await languages[languageCode].getMessages()).default;
    i18n.setLocaleMessage(languageCode, messages);
  }
  i18n.locale = languageCode;
  document.documentElement.setAttribute('lang', languageCode);
};

export const preferredLocale = (() => {
  const code = navigator.language.split('-')[0];
  return languages[code] ? code : fallbackLocale;
})();

if (module.hot) {
  module.hot.accept(
    [
      '../../../locales/en.json',
      '../../../locales/ru.json',
      '../../../locales/cn.json',
      '../../../locales/es.json',
    ],
    async () => {
      Object.entries(languages).forEach(async ([code, { getMessages }]) => i18n
        .setLocaleMessage(code, (await getMessages()).default));
    },
  );
}

export default (store) => {
  store.registerModule('languages', {
    namespaced: true,
    state: {
      activeCode: store.state.languages ? store.state.languages.activeCode : preferredLocale,
    },
    getters: {
      list: () => Object.entries(languages)
        .map(([code, { name }]) => ({ code, name }))
        .sort(),
      active: ({ activeCode }, { list }) => list.find(({ code }) => code === activeCode),
    },
    mutations: {
      setActiveCode(state, languageCode) {
        state.activeCode = languageCode;
      },
    },
  });

  if (Intl.PluralRules) {
    VueI18n.prototype.getChoiceIndex = (choice, choicesLength) => {
      let value = {
        one: 1,
        few: 2,
        many: 3,
        other: 3,
      }[new Intl.PluralRules(store.state.languages.activeCode).select(choice)];
      if (choice === 0) value = 0;
      return Math.min(value, choicesLength - 1);
    };
  }

  store.watch(
    ({ languages: { activeCode } }) => activeCode,
    (activeCode) => fetchAndSetLocale(activeCode),
    { immediate: true },
  );
};

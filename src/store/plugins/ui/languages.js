/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '../../../locales/en.json';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  fallbackLocale: 'en',
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
};

if (module.hot) {
  module.hot.accept(
    ['../../../locales/en.json', '../../../locales/ru.json'],
    async () => {
      Object.entries(languages).forEach(async ([code, { getMessages }]) => i18n
        .setLocaleMessage(code, (await getMessages()).default));
    },
  );
}

export default async (store) => {
  const preferredLanguageCode = process.env.UNFINISHED_FEATURES
    ? navigator.language.split('-')[0] : 'en';

  store.registerModule('languages', {
    namespaced: true,
    state: {
      activeCode: (store.state.languages && store.state.languages.activeCode)
        || (languages[preferredLanguageCode] ? preferredLanguageCode : 'en'),
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
        i18n.locale = languageCode;
      },
    },
    actions: {
      async fetch(context, languageCode) {
        if (!i18n.availableLocales.includes(languageCode)) {
          const messages = (await languages[languageCode].getMessages()).default;
          i18n.setLocaleMessage(languageCode, messages);
        }
      },
      async setActiveCode({ commit, dispatch }, languageCode) {
        await dispatch('fetch', languageCode);
        commit('setActiveCode', languageCode);
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

  await store.dispatch('languages/fetch', store.state.languages.activeCode);
  i18n.locale = store.state.languages.activeCode;
};

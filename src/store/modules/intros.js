import Vue from 'vue';

const intros = {
  apps: [{
    header: 'Welcome to the æpps browser!',
    body: `
      This part of the Base æpp Wallet is in beta. It is safe to use,
      but we are in the process of refining the experience.
    `,
  }, {
    header: 'What is an æpp?',
    body: 'æpps are decentralized applications powered by the æternity blockchain.',
  }],
  names: [{
    header: 'Welcome to the æternity Naming System (AENS)!',
    body: `
      This part of the Base æpp Wallet is in beta. We are actively refining
      the AENS functionality and are excited to share the process with you.
    `,
  }, {
    header: 'How does the AENS work?',
    body: `
      The AENS allows users to claim names and associate them with one or more æternity accounts.
      For now, only names ending in .test (part of the .test namespace) can be claimed. After you
      have successfully claimed a name it is associated with one of your accounts.
    `,
  }],
};

export default {
  namespaced: true,

  state: {
    read: {},
  },

  mutations: {
    markAsRead({ read }, key) {
      Vue.set(read, key, true);
    },
  },

  actions: Object.entries(intros).reduce(
    (p, [key, content]) => ({
      ...p,
      async [key]({ state: { read }, commit, dispatch }) {
        if (read[key]) return;
        commit('markAsRead', key);
        await dispatch('modals/open', { name: 'showIntro', content }, { root: true });
      },
    }),
    {},
  ),
};

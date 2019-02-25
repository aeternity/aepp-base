export default {
  migrate(state) {
    const newState = { ...state };
    delete newState.apps;
    return newState;
  },
};

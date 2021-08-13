import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shouldShowInit: true,
  },
  mutations: {
    setShouldShowInit(state, value) {
      state.shouldShowInit = value;
    },
  },
  actions: {},
  modules: {},
});

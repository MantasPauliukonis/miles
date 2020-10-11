import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    relay: undefined,
    variables: {},
    controls: {
      throttle: 0,
      refill: 0,
      gear: 0,
    },
  },
  mutations: {
    updateVariables(state, variables) {
      state.variables = variables;
    },
    updateControl(state, { name, value }) {
      Vue.set(state.controls, name, value);
    },
    setRelay(state, relay) {
      state.relay = relay;
    },
   },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { Logic } from '@/logic';
import { Relay } from '@/logic/relay';

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const logic = new Logic();
const relay = new Relay(logic);

store.commit('setRelay', relay);

setInterval(() => {
  logic.engine.throttle = store.state.controls.throttle / 100;
  logic.pump.duty = store.state.controls.refill / 100;

  logic.gearbox.currentGear = store.state.controls.gear;

  logic.update();
  store.commit('updateVariables', JSON.parse(JSON.stringify(logic.variables)))
}, 100);
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueShowdownPlugin from 'vue-showdown';

Vue.use(VueShowdownPlugin, {
  options: {
    emoji: true,
  },
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

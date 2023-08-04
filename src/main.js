import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import notice from './plugs/notice'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(notice);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

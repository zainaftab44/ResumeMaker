import Vue from 'vue'
import App from './App.vue'
import './assets/bootstrap.min.css';
// import './assets/brands.min.css';
import './assets/styles.css';


Vue.config.productionTip = true

new Vue({
  render: h => h(App),
}).$mount('#app')

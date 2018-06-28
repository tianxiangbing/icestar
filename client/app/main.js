///txb 
import Vue from 'vue';
import App from './App.vue';
import tab from "components/tab/tab";
import Dialog from "components/dialog/index";
import Alert from './components/alert/index';
Vue.component('tab', tab);
console.log(tab)
// Vue.component('vdialog',dialog);
// Vue.prototype.vdialog = dialog;
const install = function (Vue) {
  Vue.component('Dialog', Dialog);
  Vue.component('Alert', Alert);
}
Vue.use(install)
Vue.prototype.valert = Alert;
Vue.prototype.vdialog = Dialog;
new Vue({
  render: h => h(App)
}).$mount('#app');

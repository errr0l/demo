import '@babel/polyfill';

import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/reset.css';
import App from './App';

import router from "./router/index";
import store from "./store/index";

Vue.use(ElementUI);

new Vue({
    router, store,
    render: h => h(App)
}).$mount('#app');
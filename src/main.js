import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Routes from './router/routes';
import API from './Plugins/API'
import modal  from './store/modal'

Vue.use(API)

Vue.use(VueRouter)
const router = new VueRouter({
    routes:Routes,
    mode:'history'
})

export const bus = new Vue()

new Vue({
    render: (h) => h(App),
    store:modal,
    router:router
}).$mount('#app');

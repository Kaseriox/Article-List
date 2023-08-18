import Vue from 'vue';
import Vuex from 'vuex'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from './App.vue';
import VueRouter from 'vue-router';
import Routes from './router/routes';
import API from './Plugins/API'
import Store from './store/store';

Vue.use(API)
Vue.use(Vuex)
Vue.use(Buefy)
Vue.use(VueRouter)

const router = new VueRouter({
    routes:Routes,
    mode:'history'
})
const store = new Vuex.Store(Store)


new Vue({
    render: (h) => h(App),
    store,
    router:router
}).$mount('#app');

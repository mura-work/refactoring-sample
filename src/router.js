import Vue from 'vue';
import Router from 'vue-router';
import InvoicePage from './pages/session1/invoice.page.vue'
import Home from './pages/Home.page.vue'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/invoice',
      name: 'invoice-page',
      component: InvoicePage,
    },
  ]
});

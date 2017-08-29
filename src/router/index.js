import Vue from 'vue';
import Router from 'vue-router';
import Good from '../components/goods/goods.vue';
import Seller from '../components/seller/seller.vue';
import Ratings from '../components/ratings/ratings.vue';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/goods',
      name: 'Goods',
      component: Good
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ],
  linkActiveClass: 'active'
});

export default router;


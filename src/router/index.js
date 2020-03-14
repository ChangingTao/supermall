import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const Profile = () => import('../views/profile/Profile');
const Cart = () => import('../views/cart/Cart');

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/category',
    component: Category
  }
]

const router = new VueRouter({
  mode: 'history',
  routes


});

export default router



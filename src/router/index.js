import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'About' }
  },
  {
    path: '/about',
    name: 'About',
	component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
,
  {
    path: '/compass',
    name: 'Compass',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "calculator" */ '../views/Compass.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

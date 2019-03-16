import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Login/register.vue')
    },
    {
      path: '/index',
      name: 'index',
      // redirect:'/home',
      component: () => import('./views/index.vue'),
      children:[
        {
          path: '/',
          name: '首页',
          component: () => import('./views/home/home.vue')
        },
        {
          path: '/carList',
          name: '卖车',
          component: () => import('./views/buyCar/carList.vue')
        },
        {
          path: '/carDetail',
          name: '车辆详情',
          component: () => import('./views/buyCar/carDetail.vue')
        },
        {
          path: '/soldCar',
          name: '卖车',
          component: () => import( './views/soldCar/soldCar.vue')
        },
        {
          path: '/self',
          name: '个人',
          component: () => import('./views/self/self.vue')
        },
        {
          path: '/edit',
          name: '编辑',
          component: () => import('./views/self/edit.vue')
        },
        {
          path: '/collection',
          name: '我的收藏',
          component: () => import('./views/self/collection.vue')
        },
        {
          path: '/help',
          name: '意见反馈',
          component: () => import('./views/self/help.vue')
        },
        {
          path: '/mySold',
          name: '卖车情况',
          component: () => import('./views/self/mySold.vue')
        },
      ]
    }
  ]
})

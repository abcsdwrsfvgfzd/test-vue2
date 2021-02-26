/*
 * @Author: your name
 * @Date: 2021-02-25 09:12:36
 * @LastEditTime: 2021-02-25 17:12:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      redirect: '/login',
      component: () => import('@/App'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/login/index')
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/index')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/register/index')
        },
        {
          path: 'table',
          name: 'table',
          component: () => import('@/views/table/index')
        }
      ]
    }
  ]
})

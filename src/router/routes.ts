import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }, 
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/home', name: 'home', component: () => import('pages/Home.vue') }],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

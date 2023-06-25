import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/views/register'
import BasePage from '@/views/base-page'
import Login from '@/views/login'
import Category from '@/views/category'
import Produt from '@/views/product'
import Busket from '@/views/busket'

const routes = [
  { path: '/', component: BasePage },
  { path: '/register', component: Register },
  { path: '/auth', component: Login },
  { path: '/category/:id', component: Category },
  { path: '/product/:id', component: Produt },
  { path: '/busket/:id', component: Busket },
  
]

localStorage.ip = "http://127.0.0.1:3000/"

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

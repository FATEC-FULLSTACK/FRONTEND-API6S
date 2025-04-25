import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/avaliacao',
      name: 'criterios',
      component: Criterios,
    },
    {
      path: '/Answer1',
      name: 'answer1',
      component: () => import ('@/views/Answer1.vue')
    },
    {
      path: '/Answer2',
      name: 'answer2',
      component: () => import ('@/views/Answer2.vue')
    }
  ],
})

export default router

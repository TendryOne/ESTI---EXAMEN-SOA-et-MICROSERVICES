import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/components/MyForm.vue'),
    },
    {
      path: '/user/:employeeId/:NAS',
      component: () => import('@/components/MyForm2.vue'),
    },
  ],
})

export default router

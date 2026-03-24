import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReportAEView from '../views/ReportAEView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/report-ae',
    name: 'report-ae',
    component: ReportAEView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

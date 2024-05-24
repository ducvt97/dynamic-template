import ColorPalettesView from '@/views/ColorPalettesView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ColorPalettesView',
      component: ColorPalettesView
    },
    {
      path: '/:id',
      name: 'PaletteDetailView',
      component: () => import('../views/PaletteDetailView.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
// Importiere deine Views (Pfade ggf. anpassen)
import PersonListView from '../views/person/PersonListView.vue'
import PersonDetailView from '../views/person/PersonDetailView.vue'
import WeatherListView from '../views/weather/WeatherListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/personen',
      name: 'personen-liste',
      component: PersonListView
    },
    {
      // :id kann eine GUID sein oder das Wort 'neu'
      path: '/personen/:id',
      name: 'personen-detail',
      component: PersonDetailView
    },
    {
      path: '/weather',
      name: 'weather',
      component: WeatherListView
    },
    {
      path: '/',
      redirect: '/personen'
    }
  ]
})

export default router

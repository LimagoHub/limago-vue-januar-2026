import { createApp } from 'vue'
import { createPinia } from 'pinia'
// WICHTIG: Der korrekte Import für das Persistenz-Plugin
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

// Bootstrap CSS & JS (Wichtig für das UI und interaktive Elemente)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)

// 1. Pinia Instanz erstellen
const pinia = createPinia()

// 2. Das Plugin bei Pinia registrieren
pinia.use(createPersistedState())

// 3. Erst Pinia, dann Router zur App hinzufügen
app.use(pinia)
app.use(router)

// 4. Die App mounten
app.mount('#app')

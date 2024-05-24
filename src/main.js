import { createApp } from 'vue'

import './assets/main.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives
})

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')

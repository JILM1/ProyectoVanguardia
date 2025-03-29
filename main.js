// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importa el CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// Si quieres utilizar los componentes interactivos, importa también el bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App)
  .use(router)
  .mount('#app')

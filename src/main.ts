import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './app/router'
import PrimeVue from 'primevue/config'

import App from './app'

createApp( App )
  .use( createPinia() )
  .use( router )
  .use( PrimeVue )
  .mount( '#app' )

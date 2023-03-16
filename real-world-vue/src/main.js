import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
// import GStore from './stores/GStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.provide('GStore', GStore)

app.mount('#app')

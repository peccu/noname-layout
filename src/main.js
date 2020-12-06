import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store.js'

const app = createApp(App)
app.mount('#app')
app.use(store)

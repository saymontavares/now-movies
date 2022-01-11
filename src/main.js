import { createApp } from 'vue'
import App from './App.vue'
import axios from './plugins/axios'
import 'bootstrap'
import './assets/css/theme.min.css'
import './assets/css/bootstrap-icons.css'
import VueCookies from 'vue3-cookies'
import VueLazyLoad from "vue3-lazyload"

const app = createApp(App)

app.config.globalProperties.axios = axios

app.use(VueCookies, {
        expireTimes: "362d",
        secure: true
    })
    .use(VueLazyLoad)
    .mount('#app')

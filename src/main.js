import { createApp } from 'vue'
import App from './App.vue'
import axios from './plugins/axios'
import 'bootstrap'
import './assets/css/theme.min.css'
import './assets/css/bootstrap-icons.css'

const app = createApp(App);

app.config.globalProperties.axios = axios;

app.mount('#app')

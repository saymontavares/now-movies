import axios from 'axios'

export default axios.create({
    baseURL: process.env.VUE_APP_BASE_URL_API,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json'
    }
})
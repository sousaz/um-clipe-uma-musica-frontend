import axios from 'axios'


const api = axios.create({
    baseURL: 'https://um-clipe-uma-musica-backend-ettyczadh.vercel.app/api'
})

export default api;
import axios from 'axios'

const API = axios.create({
    // baseURL: "http://localhost:6662/api",   // for development 
    baseURL: "https://dice-game-backend-pgv6.onrender.com/api",   // for production 
    withCredentials: true
})


export default API
import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:6662/api",   // for development purpose
    withCredentials: true
})


export default API
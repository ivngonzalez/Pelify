import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // La URL del backend
    withCredentials: true,               // Cookies
    headers: {
    'Content-Type': 'application/json'
    }
});

export default api;
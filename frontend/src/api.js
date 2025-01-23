import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

const apiUrl = "/choreo-apis/reactdjangonotes-lo/backend/v1";

const api = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
        // VITE_API_URL is an environment variable that we set in the .env file
    }
);

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            // Set the Authorization header with the Bearer token for authentication
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config
    },
    (error) => {
        return Promise.reject(error)  
    }
)

export default api; // we export the api object so that we can use it in other parts of our application 

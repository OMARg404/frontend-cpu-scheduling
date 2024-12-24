// src/axiosConfig.js
import axios from 'axios';

// Set up Axios instance with the backend API URL
const axiosConfig = axios.create({
    baseURL: 'http://localhost:5000', // Flask backend URL (make sure Flask runs on port 5000 by default)
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosConfig;
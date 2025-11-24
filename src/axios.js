import axios from 'axios';
import router from './components/router';
import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  withXSRFToken: true
});

axiosClient.interceptors.response.use((response) => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    router.push({name: 'Login'});
  }

  throw error;
})




export default axiosClient;
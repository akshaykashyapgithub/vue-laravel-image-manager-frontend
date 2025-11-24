import axiosClient from "../axios";
import { defineStore } from "pinia";

const useUserStore = defineStore('user', {
    state: () => ({
      user: null
    }),
    actions: {
      fetchUser() {
        return axiosClient.get('/api/user')
          .then(({data}) => {
           // console.log(data)
            this.user = data
          })
      },
      initializeAuth() {
        const token = localStorage.getItem('token');
        if (token) {
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          return this.fetchUser().catch(() => {
            localStorage.removeItem('token');
            delete axiosClient.defaults.headers.common['Authorization'];
          });
        }
        return Promise.resolve();
      }
    }
  })
  
  export default useUserStore;
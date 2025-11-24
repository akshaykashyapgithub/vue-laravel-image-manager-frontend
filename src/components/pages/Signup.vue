<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Guestlayout from '../Guestlayout.vue';
import axiosClient from '../../axios.js';
import useUserStore from '../../store/user.js';

const data=ref({
    fullname:'',
    email:'',
    password:''
});

const errorMsg = ref({
  fullname: [],
  email: [],
  password: [],
  general: []
});

const router = useRouter();

async function submitForm() {
  // clear previous errors before submit
  errorMsg.value = { fullname: [], email: [], password: [], general: [] };

  try {
    await axiosClient.get('/sanctum/csrf-cookie');

    // Post to /api/register with the custom UserController endpoint
    const { data: resp } = await axiosClient.post('/api/register', data.value);

    // Store token and set Authorization header
    localStorage.setItem('token', resp.token);
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${resp.token}`;

    const userStore = useUserStore();
    // Fetch user data into store (will use the token for authentication)
    await userStore.fetchUser();

    router.push({ name: 'Home' });

  } catch (error) {
    // handle validation or network errors
    const resp = error.response?.data;
    if (resp && resp.errors) {
      errorMsg.value = resp.errors;
    } else {
      errorMsg.value = {
        fullname: [],
        email: [],
        password: [],
        general: [resp?.message || error.message || 'Something went wrong']
      };
    }
  }
}


 


</script>

<template>
<Guestlayout> 

    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create new account</h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="submitForm" class="space-y-4">
        
        <div>
          <label for="fullname" class="block text-sm/6 font-medium text-gray-100">Full Name</label>
          <div class="mt-2">
            <input type="text" v-model="data.fullname" name="fullname" id="fullname"  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>
        <p class="text-red-500" >{{ errorMsg.fullname?.[0] }} </p>
        
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-100">Email address</label>
          <div class="mt-2">
            <input type="email" v-model="data.email" name="email" id="email"  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>
        <p class="text-red-500" >{{ errorMsg.email?.[0] }} </p>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>
            
          </div>
          <div class="mt-2">
            <input type="password" v-model="data.password" name="password" id="password"  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>
        <p class="text-red-500" >{{ errorMsg.password?.[0] }} </p>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Create account</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400">
        Already member?
        {{ ' ' }}
        <RouterLink :to="{name:'Login'}" href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Sign in to your account</RouterLink>
      </p>
    </div>

</Guestlayout>

</template>

<style scoped>

</style>

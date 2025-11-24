<script setup>
import Guestlayout from '../Guestlayout.vue';
import { ref } from 'vue';

import axiosClient from '../../axios.js';
import { data } from 'autoprefixer';
import axios from 'axios';
import router from '../router.js';
const logindata=ref({
        email:'',
        password:''
    });

const errorMessage = ref('');

function submit() {
    axios.get('http://localhost:8000/sanctum/csrf-cookie').then(( ) => {
    axiosClient.post('/api/login', logindata.value)
});
}
</script>

<template>
<Guestlayout> 
<h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submit">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-100">Email address</label>
          <div class="mt-2">
            <input type="email" v-model="logindata.email"  name="email" id="email" autocomplete="email" required="" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input type="password" v-model="logindata.password" name="password" id="password" autocomplete="current-password" required="" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
        </div>
      </form>

      <div v-if="errorMessage" class="mt-4 py-2 px-3 rounded text-white bg-red-400">
      {{errorMessage}}
    </div>

      <p class="mt-10 text-center text-sm/6 text-gray-400">
        Not a member?
        {{ ' ' }}
        <RouterLink :to="{name:'Signup'}" href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Create an account</RouterLink>
      </p>
    </div>    
</Guestlayout>

</template>

<style scoped>

</style>

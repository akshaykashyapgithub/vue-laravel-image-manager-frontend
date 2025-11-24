<script setup>
import { PhotoIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue';
import axiosClient from '../../axios';
import router from '../router.js';

const  data=ref({
    imageFile:null,
    label:''
});

function uploadImage() {
  // Logic to handle image upload
  const formData = new FormData();
  formData.append('image', data.value.imageFile);
  formData.append('label', data.value.label);
  axiosClient.post('/api/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    router.push({ name: 'MyImages' });
    console.log('Image uploaded successfully:', response.data);
  }).catch(error => {
    console.error('Error uploading image:', error);
  });
  console.log('Image upload function called');
}
</script>

<template>


<header class="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-white">Upload Images</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
       <form @submit.prevent="uploadImage">
         <div class="mb-4">
          
            <label for="cover-photo" class="block text-sm/6 font-medium text-white">Select a image </label>
            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
              <div class="text-center">
                <PhotoIcon class="mx-auto size-12 text-gray-600" aria-hidden="true" />
                <div class="mt-4 flex text-sm/6 text-gray-400">
                  <label for="file-upload" class="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300">
                    <span>Upload a file</span>
                    <input id="file-upload" @change="data.imageFile=$event.target.files[0]" name="file-upload" type="file" class="sr-only" />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs/5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label for="label" class="block text-sm/6 font-medium text-white">Label</label>
            <div class="mt-2">
              <input type="text" v-model="data.label" name="label" id="label" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
            </div>
          </div>
    
      <button type="submit" class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Upload</button>
    </form>

      </div>
    </main>


          
</template>

<style scoped>

</style>

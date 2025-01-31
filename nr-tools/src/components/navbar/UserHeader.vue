<template>
     <header class="bg-blue-800 text-white shadow-md">
    <div class="max-w-screen-xl mx-auto flex justify-between items-center p-4">
      <!-- Logo -->
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="NamgRengaw Logo" />
        <span class="text-2xl font-semibold">NamgRengaw</span>
      </div>

      <!-- Navbar -->
      <nav class="flex space-x-6">
        <a href="#" class="hover:bg-blue-600 px-4 py-2 rounded-2xl">Home</a>
        <a href="#" class="hover:bg-blue-600 px-4 py-2 rounded-2xl">About</a>
        <a href="#" class="hover:bg-blue-600 px-4 py-2 rounded-2xl">Services</a>
        <a href="#" class="hover:bg-blue-600 px-4 py-2 rounded-2xl">Contact</a>
      </nav>

      <!-- User Dropdown -->
      <div class="relative">
        <button @click="toggleDropdown" class="flex items-center space-x-2">
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="User Avatar" class="h-8 w-8 rounded-full">
          <span>John Doe</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul>
            <!-- <li class="relative ">
                <a href="#" @click="toggleLanguageMenu" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Language</a>
                <ul v-if="isLanguageOpen" class="absolute left-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
                    <li><a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">English</a></li>
                    <li><a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Español</a></li>
                    <li><a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Português</a></li>
                </ul>
            </li> -->
            <li>
              <a href="#" @click.prevent="logout" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const store = useAuthStore();
const router = useRouter();

const isDropdownOpen = ref(false);
const isLanguageOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
}

const toggleLanguageMenu = () => {
  isLanguageOpen.value = !isLanguageOpen.value;
};

const logout = () => {
    store.logout();
    router.push('/login');
};
</script>
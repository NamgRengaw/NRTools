<template>
    <header class="bg-white text-blue-900 shadow-md border-b-2 border-blue-400">
    <div class="max-w-screen-xl mx-auto flex justify-between items-center p-4">
      <!-- Logo -->
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="NamgRengaw Logo" /> -->
        <Typography tag="span" class="text-2xl font-semibold" t-key="label.domain"/>
      </div>

      <!-- Navbar -->
      <nav class="flex flex-4 space-x-6 mx-40 justify-center">
        <label for="default-search" class="mb-2 text-sm font-medium text-blue-900 sr-only">
          <Typography tag="span" t-key="label.search"/>
        </label>
        <div class="relative min-w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Pesquise..." required />
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
              <Typography tag="span" t-key="label.search"/>
            </button>
        </div>
      </nav>

      <!-- User Dropdown -->
      <div class="relative">
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Typography from '@/ui/text/Typography.vue';

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
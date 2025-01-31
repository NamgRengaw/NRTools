<template>
    <div class="fixed top-5 right-5 space-y-2 z-50">
        <TransitionGroup
        tag="div"
        enter-active-class="transition ease-out duration-600"
        enter-from-class="opacity-0 translate-y-[-10px]"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-[-10px]"
        >
            <div v-for="alert in alerts" :key="alert.id">
                <div id="alert-1" class="flex items-center p-4 mb-4 border border-t-6 rounded-lg" :class="alertClasses(alert.type)" role="alert">
                    <svg class="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span class="sr-only">Info</span>
                    <div class="ms-3 text-sm font-medium">
                        {{ alert.message }}
                    </div>
                </div>
            </div>
        </TransitionGroup>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useAlertStore } from "@/stores/alerts";
  
  const alertStore = useAlertStore();
  const alerts = computed(() => alertStore.alerts);
  
  function removeAlert(id) {
    alertStore.removeAlert(id);
  }
  
  function alertClasses(type) {
    return {
      "bg-blue-50 text-blue-800 border border-blue-500": type === "info",
      "bg-green-50 text-green-800 border border-green-500": type === "success",
      "bg-yellow-50 text-yellow-800 border border-yellow-500": type === "warning",
      "bg-red-50 text-red-800 border border-red-500": type === "error",
    };
  }
</script>
  
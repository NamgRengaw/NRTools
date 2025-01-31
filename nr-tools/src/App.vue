<template>
  <header>
    <div class="wrapper">
      <nav class="">
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
      </nav>
    </div>
  </header>
  <Alert />
  <RouterView />
</template>

<script setup>
  import Alert from "@/components/alerts/Alert.vue";
  import { RouterLink, RouterView } from 'vue-router'
</script>

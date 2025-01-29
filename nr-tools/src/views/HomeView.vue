<script setup>
  import { QHeader, QToolbar, QToolbarTitle, QBtn, QIcon } from 'quasar';
</script>

<template>
   <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar -->
    <q-header elevated class="bg-blue-800 text-white">
      <q-toolbar>
        <q-toolbar-title>Minha Home Page</q-toolbar-title>
        <div class="q-gutter-sm">
          <q-btn label="Início" flat class="text-white" />
          <q-btn label="Sobre" flat class="text-white" />
          <q-btn label="Contato" flat class="text-white" />
        </div>
      </q-toolbar>
    </q-header>

    <!-- Hero Section -->
    <section class="flex-1 bg-blue-900 text-white flex flex-col items-center justify-center py-24 px-6 text-center">
      <h1 class="text-5xl font-semibold">Bem-vindo ao Meu Site!</h1>
      <p class="mt-4 text-xl">Aqui você encontra soluções e recursos para melhorar sua produtividade.</p>
      <q-btn label="Explore" color="primary" size="lg" class="mt-6" />
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-semibold text-center text-blue-900">Nossos Recursos</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
          <div class="text-center p-6 border rounded-lg shadow-lg">
            <q-icon name="chat" size="50px" class="text-blue-900" />
            <h3 class="mt-4 text-xl font-medium text-blue-900">Facilitadores</h3>
            <p class="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque corrupti, numquam et esse rerum unde nesciunt corporis aliquid quo placeat dolore molestias doloribus minima praesentium cum magnam reiciendis tempora deleniti.</p>
          </div>
          <div class="text-center p-6 border rounded-lg shadow-lg">
            <q-icon name="extensions" size="50px" class="text-blue-900" />
            <h3 class="mt-4 text-xl font-medium text-blue-900">Utilitarios</h3>
            <p class="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque corrupti, numquam et esse rerum unde nesciunt corporis aliquid quo placeat dolore molestias doloribus minima praesentium cum magnam reiciendis tempora deleniti.</p>
          </div>
          <div class="text-center p-6 border rounded-lg shadow-lg">
            <q-icon name="group" size="50px" class="text-blue-900" />
            <h3 class="mt-4 text-xl font-medium text-blue-900">Para devs</h3>
            <p class="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque corrupti, numquam et esse rerum unde nesciunt corporis aliquid quo placeat dolore molestias doloribus minima praesentium cum magnam reiciendis tempora deleniti.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-blue-900 text-white py-6">
      <div class="container mx-auto text-center">
        <p>&copy; 2025 Meu Site | Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

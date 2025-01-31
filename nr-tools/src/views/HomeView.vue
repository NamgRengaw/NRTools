<template>
  <div class="min-h-svh flex flex-col bg-gray-100">
     <UserHeader />

    <!-- Hero Section -->
    <section class="flex-1 bg-blue-900 text-white flex flex-col items-center justify-center py-12 px-6 text-center">
      <div class="text-7xl mb-10">Posições letras alfabeto</div>
      <p class="text-xl">Conversor de letras do alfabeto para suas respectivas posições.</p>
    </section>

    <section class="py-16 mx-auto max-w-screen-md bg-white">
      <div class="p-4">
        <label for="textInput" class="block mb-2 text-xl">Digite o texto para conversão:</label>
        <input
          v-model="inputText"
          id="textInput"
          type="text"
          class="border p-2 rounded w-full"
          placeholder="Digite aqui"
        />

        <div v-if="letterPositions.length > 0" class="mt-4">
          <p><strong>Posições das letras no alfabeto:</strong></p>
          <div class="flex flex-row">
            <q-chip
              v-for="(position, index) in letterPositions" 
              :key="index"
              text-color="white"
              color="blue-9">
              {{ inputText[index].toUpperCase() }}: {{ position }}
            </q-chip>
          </div>
        </div>
        <div v-if="letterPositions.length > 0" class="mt-4">
          <p><strong>Posições acumuladas das letras:</strong></p>
          <div class="px-2 py-1 bg-blue-800 text-white rounded-full justify-center flex text-xl">
            <div>
              <span
              v-for="(position, index) in letterPositions" 
              :key="index">
              {{ position }}
            </span>
          </div>
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

<script setup>
  import UserHeader from '@/components/navbar/UserHeader.vue';
  import { QBtn, QChip } from 'quasar';
  import { ref, computed } from 'vue';

  const inputText = ref('');

const letterPositions = computed(() => {
    return inputText.value.split('')
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const charCode = char.toLowerCase().charCodeAt(0);
        return charCode - 97 + 1; 
      }
      return null;
    }).filter(position => position !== null);
  });
</script>

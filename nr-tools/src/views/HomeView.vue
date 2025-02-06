<template>
  <div class="min-h-svh flex flex-col bg-white">
    <NavBar />
    <section class="flex-1 bg-white text-blue-900 flex flex-col items-center justify-center pt-6 px-6 text-center">
      <Typography tag="div" class="text-4xl mb-5" t-key="label.word_positions_converter"/>
    </section>
    <section class="flex-10 py-16 mx-auto max-w-screen-md w-3xl bg-white">
      <Typography tag="div" class="text-lg mb-1" t-key="label.write_down_text_to_conversion" />
      <InputField ref="input" v-model="inputText" type="textarea" label="label.text_to_position_input"/>
      <Typography tag="div" class="text-lg mb-1" t-key="label.result" />
      <InputField ref="output" v-model="outputText" :readonly="true" type="textarea" label="label.converted_text"/>
      
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
    </section>

    <!-- Footer -->
    <footer class="flex-1 bg-blue-900 text-white py-6">
      <div class="container mx-auto text-center">
        <p>&copy; 2025 Meu Site | Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { QBtn, QChip } from 'quasar';
  import Typography from '@/ui/text/Typography.vue';
  import NavBar from '@/components/navbar/NavBar.vue';
  import InputField from '@/ui/fields/InputField.vue';

const inputText = ref('');
const outputText = ref('');

const letterPositions = computed(() => {
    let letterPositions = inputText.value.split('')
    .map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const charCode = char.toLowerCase().charCodeAt(0);
        return charCode - 97 + 1; 
      }
      return null;
    }).filter(position => position !== null);
    outputText.value = letterPositions;
    return letterPositions
  });
</script>

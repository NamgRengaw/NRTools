<template>
    <div class="flex justify-center items-center h-screen bg-radial from-white from-60% to-blue-400">
        <!-- Head -->
        <!-- Body -->
        <div class="px-3 py-15 m-10 min-w-1/4 bg-white border border-gray-400 shadow-2xl rounded-2xl">
            <div class="flex justify-center items-center">
                <Typography tKey="login" class="text-5xl text-blue-800 font-bold subpixel-antialiased"/>
            </div>
            <q-input 
                outlined 
                label-slot
                class="m-5" 
                v-model="data.user">
                <template v-slot:label>
                    <Typography tKey="email"/>
                </template>
            </q-input>
            <q-input 
                outlined 
                label-slot 
                append-slot
                class="m-5" 
                :type="passwordType" 
                v-model="data.password" 
                >
                <template v-slot:label>
                    <Typography tKey="password"/>
                </template>
                <template v-slot:append>
                    <q-icon :name="passwordIcon" @click="togglePasswordFieldState" class="cursor-pointer" />                    
                </template>
            </q-input>
            <div class="flex justify-center items-center">
                <q-btn
                    no-caps
                    color="blue-10">
                    <Typography tKey="login" class="text-xl"/>
                </q-btn>
            </div>
            <div class="flex flex-col justify-center items-center">
                <Typography tKey="forgot_password_question" class="mt-12 mb-2 text-md text-blue-600 cursor-pointer"/>
                <Typography tKey="cant_access_account_question" class="mb-2 text-md text-blue-600 cursor-pointer"/>
                <Typography tKey="register_question" class="text-md text-blue-600 cursor-pointer"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { QInput, QBtn } from 'quasar';
import Typography from '@/ui/text/Typography.vue';

const showPassword = ref(false);
const data = ref({user: null, password: null})

const passwordIcon = computed(() => showPassword.value ? 'visibility_off' : 'visibility');
const passwordType = computed(() => showPassword.value ? 'text' : 'password');

function togglePasswordFieldState() {
    showPassword.value = !showPassword.value;
}

</script>

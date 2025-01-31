<template>
    <div class="flex justify-center items-center h-screen bg-radial from-white from-60% to-blue-400">
        <div class="px-3 py-15 m-10 min-w-1/4 bg-white border border-gray-400 shadow-2xl rounded-2xl">
            <div class="flex justify-center items-center">
                <Typography tKey="login" class="text-5xl text-blue-800 font-bold subpixel-antialiased"/>
            </div>
            <q-input 
                ref="emailInput"
                outlined 
                label-slot
                class="m-5" 
                v-model="data.user"
                lazy-rules="ondemand"
                :rules="emailRules"
                >
                <template v-slot:label>
                    <Typography tKey="email"/>
                </template>
            </q-input>
            <q-input 
                ref="passwordInput"
                outlined 
                label-slot 
                append-slot
                class="m-5" 
                :type="passwordType" 
                v-model="data.password" 
                lazy-rules="ondemand"
                :rules="passwordRules"
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
                    color="blue-10"
                    @click="authenticate">
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
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';
import { QInput, QBtn } from 'quasar';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useAlertStore } from "@/stores/alerts";
import Typography from '@/ui/text/Typography.vue';

const { t } = useI18n();
const router = useRouter();
const alert = useAlertStore();

const showPassword = ref(false);
const data = ref({user: null, password: null})

const passwordIcon = computed(() => showPassword.value ? 'visibility_off' : 'visibility');
const passwordType = computed(() => showPassword.value ? 'text' : 'password');

const emailInput = ref(null);
const passwordInput = ref(null);
const required = value => !!value || t('validation.required');
const noSpaces = (value) => value.trim() === value || t('validation.noSpaces');

const minEmailLength = (value) => value.length >= 5 || t('validation.minEmailLength', {min: 5});
const maxEmailLength = (value) => value.length <= 100 || t('validation.maxEmailLength', {max: 100});
const emailValidation = (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || t('validation.invalidEmail');
};

const emailRules = [
    required,
    noSpaces,
    minEmailLength,
    maxEmailLength,
    emailValidation,
];

const minPasswordLenght = (value) => value.length >= 8 || t('validation.minPasswordLength', {min: 8});
const maxPasswordLenght = (value) => value.length <= 64 || t('validation.maxPasswordLength', {max: 64});
const specialCharacterRequired = (value) => /[\W_]/.test(value) || t('validation.specialCharacterRequired', {number: 1});
const numberRequired = (value) => /\d/.test(value) || t('validation.numberRequired', {number: 1});

const passwordRules = [
    required,
    noSpaces,
    minPasswordLenght,
    maxPasswordLenght,
    specialCharacterRequired,
    numberRequired,
];

function togglePasswordFieldState() {
    showPassword.value = !showPassword.value;
}

function authenticate() {
    const store = useAuthStore();
    const emailValid = emailInput.value.validate();
    const passwordValid = passwordInput.value.validate();
    
    if (emailValid && passwordValid) {
        data.value.token = data.value.password;
        store.login(data.value);
        router.push('/');
        alert.addAlert({ message: t('alerts.success'), type: "success" });
    }
}

</script>

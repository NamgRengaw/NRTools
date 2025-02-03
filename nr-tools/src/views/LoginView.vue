<template>
    <div class="flex justify-center items-center h-screen bg-radial from-white from-60% to-blue-400">
        <div class="px-3 py-15 m-10 min-w-1/4 bg-white border border-gray-400 shadow-2xl rounded-2xl">
            <div class="flex justify-center items-center mb-12">
                <Typography tKey="label.login" class="text-5xl text-blue-800 font-bold subpixel-antialiased"/>
            </div>
            <InputField ref="emailInput" v-model="data.user" input-class="mx-5 mb-2" :rules="emailRules" label="label.email"/>
            <InputField  ref="passwordInput" v-model="data.password" input-class="mx-5 mb-2" :type="passwordType" :rules="passwordRules" label="label.password">
                <template v-slot:append>
                    <q-icon :name="passwordIcon" @click="togglePasswordFieldState" class="cursor-pointer" />                    
                </template>
            </InputField>
            <div class="flex justify-center items-center">
                <q-btn
                    no-caps
                    color="blue-10"
                    @click="authenticate">
                    <Typography tKey="label.login" class="text-xl"/>
                </q-btn>
            </div>
            <div class="flex flex-col justify-center items-center">
                <Typography tKey="auth.forgot_password_question" @click="goToPasswordRecoveryPage" class="mt-12 mb-2 text-md text-blue-600 cursor-pointer hover:text-blue-800 text-bold"/>
                <Typography tKey="auth.cant_access_account_question" @click="goToSuportPage" class="mb-2 text-md text-blue-600 cursor-pointer hover:text-blue-800 text-bold"/>
                <Typography tKey="auth.register_question" @click="goToRegisterPage" class="text-md text-blue-600 cursor-pointer hover:text-blue-800 text-bold"/>
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
import InputField from '@/ui/fields/InputField.vue';

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

const minEmailLength = (value) => value.length >= 5 || t('validation.min_email_length', {min: 5});
const maxEmailLength = (value) => value.length <= 100 || t('validation.max_email_length', {max: 100});
const emailValidation = (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || t('validation.invalid_email');
};

const emailRules = [
    required,
    noSpaces,
    minEmailLength,
    maxEmailLength,
    emailValidation,
];

const minPasswordLenght = (value) => value.length >= 8 || t('validation.min_password_length', {min: 8});
const maxPasswordLenght = (value) => value.length <= 64 || t('validation.max_password_length', {max: 64});
const specialCharacterRequired = (value) => /[\W_]/.test(value) || t('validation.special_character_required', {number: 1});
const numberRequired = (value) => /\d/.test(value) || t('validation.number_required', {number: 1});

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
    }
}

function goToPasswordRecoveryPage() {
    router.push('/password-recovery');
}

function goToSuportPage() {
    router.push('/suport');
}

function goToRegisterPage() {
    router.push('/register');
}

</script>

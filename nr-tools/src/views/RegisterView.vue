<template>
    <div class="flex justify-center items-center h-screen bg-radial from-white from-60% to-blue-400">
        <div class="px-3 py-15 m-10 min-w-1/4 bg-white border border-gray-400 shadow-2xl rounded-2xl">
            <div class="flex justify-center items-center mb-12">
                <Typography tKey="label.register" class="text-5xl text-blue-800 font-bold subpixel-antialiased"/>
            </div>
            <q-input 
                ref="nameInput"
                outlined 
                label-slot
                class="mx-5 mb-2" 
                v-model="data.user"
                lazy-rules="ondemand"
                :rules="nameRules"
                >
                <template v-slot:label>
                    <Typography tKey="label.name"/>
                </template>
            </q-input>
            <q-input 
                ref="phoneInput"
                outlined 
                label-slot
                class="mx-5 mb-2" 
                v-model="data.phone"
                lazy-rules="ondemand"
                :rules="phoneRules"
                >
                <template v-slot:label>
                    <Typography tKey="label.phone"/>
                </template>
            </q-input>
            <q-input 
                ref="emailInput"
                outlined 
                label-slot
                class="mx-5 mb-2" 
                v-model="data.email"
                lazy-rules="ondemand"
                :rules="emailRules"
                >
                <template v-slot:label>
                    <Typography tKey="label.email"/>
                </template>
            </q-input>
            <q-input 
                ref="passwordInput"
                outlined 
                label-slot 
                append-slot
                class="mx-5 mb-2" 
                :type="passwordType" 
                v-model="data.password" 
                lazy-rules="ondemand"
                :rules="passwordRules"
                >
                <template v-slot:label>
                    <Typography tKey="label.password"/>
                </template>
                <template v-slot:append>
                    <q-icon :name="passwordIcon" @click="togglePasswordFieldState" class="cursor-pointer" />                    
                </template>
            </q-input>
            <q-input 
                ref="confirmPasswordInput"
                outlined 
                label-slot 
                append-slot
                class="mx-5 mb-2" 
                :type="passwordType" 
                v-model="data.confirmPassword" 
                lazy-rules="ondemand"
                :rules="passwordConfirmRules"
                >
                <template v-slot:label>
                    <Typography tKey="label.password_confirmation"/>
                </template>
                <template v-slot:append>
                    <q-icon :name="passwordIcon" @click="togglePasswordFieldState" class="cursor-pointer" />                    
                </template>
            </q-input>
            <div class="flex justify-around items-center">
                <q-btn
                    no-caps
                    color="green-7"
                    @click="returnToLogin">
                    <Typography tKey="label.return" class="text-xl"/>
                </q-btn>
                <q-btn
                    no-caps
                    color="blue-10"
                    @click="register">
                    <Typography tKey="label.register" class="text-xl"/>
                </q-btn>
            </div>
            <div class="flex flex-col justify-center items-center">
                <Typography tKey="auth.forgot_password_question" @click="goToPasswordRecoveryPage" class="mt-12 mb-2 text-md text-blue-600 cursor-pointer hover:text-blue-800 text-bold"/>
                <Typography tKey="auth.cant_access_account_question" @click="goToSuportPage" class="mb-2 text-md text-blue-600 cursor-pointer hover:text-blue-800 text-bold"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref, computed } from 'vue';
import { QInput, QBtn } from 'quasar';
import { useRouter } from 'vue-router';
import { useAlertStore } from "@/stores/alerts";
import Typography from '@/ui/text/Typography.vue';

const { t } = useI18n();
const router = useRouter();
const alert = useAlertStore();

const showPassword = ref(false);
const data = ref({user: null, password: null})

const passwordIcon = computed(() => showPassword.value ? 'visibility_off' : 'visibility');
const passwordType = computed(() => showPassword.value ? 'text' : 'password');

const nameInput = ref(null);
const phoneInput = ref(null);
const emailInput = ref(null);
const passwordInput = ref(null);
const confirmPasswordInput = ref(null);

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
const passwordEqualsConfirmation = (value) => value === data.value.password || t('validation.password_does_not_match');
const phoneValidation = (value) => {
    const pattern = /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9[1-9]\d{3}[-.\s]?\d{4}|\d{4}[-.\s]?\d{4})$/;
    return pattern.test(value) || t('validation.invalid_phone_number');
};

const nameRules = [
    required,
];

const phoneRules = [
    required,
    noSpaces,
    phoneValidation,
];

const passwordRules = [
    required,
    noSpaces,
    minPasswordLenght,
    maxPasswordLenght,
    specialCharacterRequired,
    numberRequired,
];

const passwordConfirmRules = [
    required,
    passwordEqualsConfirmation,
];

function togglePasswordFieldState() {
    showPassword.value = !showPassword.value;
}

function returnToLogin() {
    router.push('/');
}

function register() {
    const nameValid = nameInput.value.validate();
    const phoneValid = phoneInput.value.validate();
    const emailValid = emailInput.value.validate();
    const passwordValid = passwordInput.value.validate();
    const confirmPasswordValid = confirmPasswordInput.value.validate();

    const hasValidFields = 
        nameValid && phoneValid && emailValid && passwordValid && confirmPasswordValid;
    
    if (hasValidFields) {
        router.push('/');
        alert.addAlert({ message: t('alerts.success'), type: "success" });
    }
}

function goToPasswordRecoveryPage() {
    router.push('/password-recovery');
}

function goToSuportPage() {
    router.push('/suport');
}

</script>

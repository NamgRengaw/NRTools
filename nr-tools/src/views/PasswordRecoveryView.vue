<template>
    <div class="flex justify-center items-center h-screen bg-radial from-white from-60% to-blue-400">
        <div class="px-3 py-15 m-10 min-w-1/4 bg-white border border-gray-400 shadow-2xl rounded-2xl">
            <div class="flex justify-center items-center mb-12">
                <Typography tKey="auth.password_recovery" class="text-5xl text-blue-800 font-bold subpixel-antialiased"/>
            </div>
            <InputField ref="emailInput" v-model="data.user" input-class="mx-5 mb-2" :rules="emailRules" label="label.email"/>
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
                    @click="sendEmail">
                    <Typography tKey="label.send_email" class="text-xl"/>
                </q-btn>
            </div>
            <div class="flex flex-col justify-center items-center">
                <Typography tKey="auth.cant_access_account_question" @click="goToSuportPage" class="mt-12 mb-2 text-md text-blue-600 cursor-pointer hover:text-blue-800 text-bold"/>
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
import { useAlertStore } from "@/stores/alerts";
import Typography from '@/ui/text/Typography.vue';
import InputField from '@/ui/fields/InputField.vue';

const { t } = useI18n();
const router = useRouter();
const alert = useAlertStore();

const data = ref({user: null})

const emailInput = ref(null);
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

function returnToLogin() {
    router.push('/');
}

function sendEmail() {
    const emailValid = emailInput.value.validate();
    
    if (emailValid) {
        router.push('/');
        alert.addAlert({ message: t('alerts.email_sended'), type: "success" });
    }
}

function goToRegisterPage() {
    router.push('/register');
}

function goToSuportPage() {
    router.push('/suport');
}

</script>

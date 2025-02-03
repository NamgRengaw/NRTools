<template>
    <div class="flex justify-center items-center h-screen bg-radial from-white from-60% to-blue-400">
        <div class="px-3 py-15 m-10 min-w-1/4 bg-white border border-gray-400 shadow-2xl rounded-2xl">
            <div class="flex justify-center items-center mb-12">
                <Typography tKey="label.suport" class="text-5xl text-blue-800 font-bold subpixel-antialiased"/>
            </div>
            <InputField ref="nameInput" v-model="data.user" input-class="mx-5 mb-2" :rules="nameRules" label="label.name"/>
            <InputField ref="phoneInput" v-model="data.phone" input-class="mx-5 mb-2" :rules="phoneRules" label="label.phone"/>
            <InputField ref="complainInput" v-model="data.complain" input-class="mx-5 mb-2" type="textarea" :rules="complainRules" label="label.description"/>
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
                    @click="sendComplaining">
                    <Typography tKey="label.send" class="text-xl"/>
                </q-btn>
            </div>
            <div class="flex flex-col justify-center items-center">
                <Typography tKey="auth.forgot_password_question" @click="goToPasswordRecoveryPage" class="mt-12 mb-2 text-md text-blue-600 cursor-pointer hover:text-blue-800 text-bold"/>
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

const data = ref({user: null, password: null})

const nameInput = ref(null);
const phoneInput = ref(null);
const complainInput = ref(null);
const required = value => !!value || t('validation.required');
const noSpaces = (value) => value.trim() === value || t('validation.noSpaces');
const phoneValidation = (value) => {
    const pattern = /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9[1-9]\d{3}[-.\s]?\d{4}|\d{4}[-.\s]?\d{4})$/;
    return pattern.test(value) || t('validation.invalid_phone_number');
};

const phoneRules = [
    required,
    noSpaces,
    phoneValidation,
];

const minLenght = (value) => value.length >= 2 || t('validation.min_lenght', {min: 2});
const maxLenght = (value) => value.length <= 100 || t('validation.max_lenght', {max: 100});

const nameRules = [
    required,
    minLenght,
    maxLenght,
];

const complainRules = [
    required,
    minLenght,
];

function sendComplaining() {
    const nameValid = nameInput.value.validate();
    const phoneValid = phoneInput.value.validate();
    const complainValid = complainInput.value.validate();
    
    if (nameValid && phoneValid && complainValid) {
        router.push('/');
        alert.addAlert({ message: t('alerts.message_sended'), type: "success" });
    }
}

function returnToLogin() {
    router.push('/');
}

function goToPasswordRecoveryPage() {
    router.push('/password-recovery');
}

function goToRegisterPage() {
    router.push('/register');
}

</script>

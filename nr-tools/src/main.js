import './assets/main.css'

import 'flowbite';
import { Quasar } from 'quasar'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n, loadLocaleMessages } from '@/plugins/i18n'

import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {plugins: {},})
app.use(i18n)

loadLocaleMessages(i18n.global.locale).then(() => {
    app.mount('#app')
})

import { createApp } from 'vue'
import './style.css'
import App from './app.vue'

import i18n from "./i18n.js";
import routes from "./routes.js";

import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { createPinia } from 'pinia';

import {
    Button,
    Card,
    Column,
    ConfirmationService,
    ConfirmDialog,
    DataTable,
    FloatLabel,
    InputText,
    Select,
    SelectButton,
    Textarea,
    Toolbar
} from "primevue";

const primeUiLicenseKey = import.meta.env.VITE_PRIME_UI_LICENSE_KEY;

const app = createApp(App);

app.use(i18n)
    .use(PrimeVue, { theme: { preset: Material }, ripple: true, license: primeUiLicenseKey })
    .use(ConfirmationService)
    .use(routes) // Aquí se inyecta el verdadero Router
    .use(createPinia())

    .component('pv-button',         Button)
    .component('pv-card',           Card)
    .component('pv-column',         Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-data-table',     DataTable)
    .component('pv-float-label',    FloatLabel)
    .component('pv-input-text',     InputText)
    .component('pv-select',         Select)
    .component('pv-select-button',  SelectButton)
    .component('pv-textarea',       Textarea)
    .component('pv-toolbar',        Toolbar)

    .mount('#app');
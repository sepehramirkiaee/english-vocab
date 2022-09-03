import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import './assets/tailwind.css'

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

import HeaderToolbar from './components/UI/HeaderToolbar.vue'
import NotificationToast from './components/UI/NotificationToast.vue'
import TheInput from './components/form/TheInput.vue'
import PrimaryButton from './components/form/PrimaryButton.vue'

const app = createApp(App)
app.component('HeaderToolbar', HeaderToolbar)
app.component('NotificationToast', NotificationToast)
app.component('TheInput', TheInput)
app.component('PrimaryButton', PrimaryButton)

app.use(VueAxios, axios).use(store).use(router).mount('#app')

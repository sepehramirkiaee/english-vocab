import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import './assets/tailwind.css'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8088';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

import HeaderToolbar from './components/UI/HeaderToolbar.vue'
import NotificationToast from './components/UI/NotificationToast.vue'
import TheDialog from './components/UI/TheDialog.vue'
import TheInput from './components/form/TheInput.vue'
import PrimaryButton from './components/form/PrimaryButton.vue'
import './registerServiceWorker'

const app = createApp(App)
app.component('HeaderToolbar', HeaderToolbar)
app.component('NotificationToast', NotificationToast)
app.component('TheDialog', TheDialog)
app.component('TheInput', TheInput)
app.component('PrimaryButton', PrimaryButton)

app.use(VueAxios, axios).use(store).use(router).mount('#app')

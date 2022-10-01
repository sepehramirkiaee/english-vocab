import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import './assets/tailwind.css'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

import HeaderToolbar from './components/UI/HeaderToolbar.vue'
import NotificationToast from './components/UI/NotificationToast.vue'
import TheDialog from './components/UI/TheDialog.vue'
import TheInput from './components/form/TheInput.vue'
import TheSelect from './components/form/TheSelect.vue'
import TheTextarea from './components/form/TheTextarea.vue'
import FieldWrapper from './components/form/FieldWrapper.vue'
import PrimaryButton from './components/form/PrimaryButton.vue'
import PrimaryCard from './components/UI/PrimaryCard.vue'
import NavigationButton from './components/form/NavigationButton.vue'
import ContentWrapper from './components/UI/ContentWrapper.vue'
import UserSideMenu from './components/UI/UserSideMenu.vue'
import './registerServiceWorker'

const app = createApp(App)
app.component('HeaderToolbar', HeaderToolbar)
app.component('NotificationToast', NotificationToast)
app.component('TheDialog', TheDialog)
app.component('TheInput', TheInput)
app.component('TheSelect', TheSelect)
app.component('TheTextarea', TheTextarea)
app.component('FieldWrapper', FieldWrapper)
app.component('PrimaryButton', PrimaryButton)
app.component('PrimaryCard', PrimaryCard)
app.component('NavigationButton', NavigationButton)
app.component('ContentWrapper', ContentWrapper)
app.component('UserSideMenu', UserSideMenu)

app.use(VueAxios, axios).use(store).use(router).mount('#app')

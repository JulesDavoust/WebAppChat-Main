import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(fas)

const app = createApp(App)

app.use(router)
app.use(Toast)

app
.component('fa', FontAwesomeIcon)
.mount('#app')

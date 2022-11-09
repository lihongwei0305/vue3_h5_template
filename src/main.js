import {createApp} from 'vue'
import App from './App.vue'
import store from "./store/index.js";
import './assets/css/common.scss'
import '@/assets/css/iconfont.css'
import router from "./router/index";
import {setVant} from "./plugin/vant.js";

import installComponents from "@com/index";
import drop from '@/directives/drop'

const APP = createApp(App)

setVant(APP)
drop(APP)
installComponents(APP)
APP.use(router)
APP.use(store);


APP.mount('#app')

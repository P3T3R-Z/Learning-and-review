import { createApp } from 'vue'
import App from './App.vue'
import Axios from "axios";
// import baseMixin from "@/mixin/baseMixin.ts"

// createApp(App).mount('#app')

const app = createApp(App);


//绑定到全局
app.config.globalProperties.Axios=Axios
 
// app.mixin(baseMixin)
app.mount('#app')

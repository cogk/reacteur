import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"

const app = createApp(App)

app.use(createPinia())
app.config.globalProperties.__ = (x) => x
app.mount("#app")

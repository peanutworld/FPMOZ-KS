import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

import "./index.css";
import "./style.css";

const app = createApp(App);

app.use(createPinia()); // Pinia for state management
app.use(router); // Vue Router for navigation

app.mount("#app");

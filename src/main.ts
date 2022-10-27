import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import { useAuthStore } from "@/auth/store";
import appApi from "@/core/api/index";

const pinia = createPinia();

appApi.init();

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(router)
  .use(pinia)
  .mount("#app");

const { loadTokenLocal } = useAuthStore();
loadTokenLocal();

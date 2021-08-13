import Vue from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { extend, localize } from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";
import axios from "axios";

// Setup vee-validate ruleset
for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
  });
}

// Localization for vee-validate
localize("en", en);

// Add auth header to axios

axios.defaults.headers["PRIVATE-TOKEN"] = "VCy54Ht8PMLvpd_XUWtG";

Vue.config.productionTip = false;

Vue.use(VueCookies);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

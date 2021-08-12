<template>
  <v-app>
    <navbar />
    <v-main>
      <router-view />
      <container-snackbar :shouldShow="snackbarShow" :snackbarMsg="snackbarMsg" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "./components/Navbar.vue";
import { mapMutations } from "vuex";
import ContainerSnackbar from "./components/ContainerSnackbar.vue";

export default Vue.extend({
  components: { Navbar, ContainerSnackbar },
  name: "App",
  data() {
    return {
      snackbarShow: undefined,
      snackbarMsg: "adhasuidau",
    };
  },
  mounted() {
    this.loadSession();
  },
  methods: {
    ...mapMutations(["setShouldShowInit"]),
    loadSession() {
      if (this.$cookies.get("auth-token")) {
        this.setShouldShowInit(false);
      }
    },
  },
});
</script>

<style>
html {
  overflow-y: auto;
}
</style>

<template>
  <v-app>
    <navbar @toggleDrawer="showDrawer = !showDrawer" />
    <navside :shouldShow="showDrawer" @updateDrawer="updateDrawer" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "./components/Navbar.vue";
import Navside from "./components/Navside.vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  components: { Navbar, Navside },
  name: "App",
  data() {
    return {
      showDrawer: false,
    };
  },
  mounted() {
    this.loadTheme();
    this.loadSession();
  },
  methods: {
    ...mapMutations(["setShouldShowInit"]),
    loadTheme(): void {
      if (localStorage.darkTheme) {
        this.$vuetify.theme.dark = JSON.parse(localStorage.darkTheme);
      }
    },
    loadSession() {
      if (this.$cookies.get("auth-token")) {
        this.setShouldShowInit(false);
      }
    },
    updateDrawer(b: boolean): void {
      this.showDrawer = b;
    },
  },
});
</script>

<style>
html {
  overflow-y: auto;
}
</style>

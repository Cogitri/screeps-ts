<template>
  <v-navigation-drawer absolute temporary v-model="shouldShowData">
    <v-list nav dense>
      <v-list-item @click="toggleDarkTheme">
        <v-icon class="pr-2">mdi-theme-light-dark</v-icon> Dark/Light Theme
      </v-list-item>
      <v-list-item v-if="$router.currentRoute.path === '/'" to="/about">
        <v-icon class="pr-2">mdi-information-variant</v-icon> About
      </v-list-item>
      <v-list-item v-else to="/"> <v-icon class="pr-2">mdi-home</v-icon> Home </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  watch: {
    shouldShowData: function () {
      this.$emit("updateDrawer", this.shouldShowData);
    },
    shouldShow: function () {
      this.shouldShowData = this.shouldShow;
    },
  },
  data() {
    return {
      shouldShowData: false,
    };
  },
  props: {
    shouldShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleDarkTheme(): void {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.darkTheme = this.$vuetify.theme.dark;
    },
  },
});
</script>

<style scoped></style>

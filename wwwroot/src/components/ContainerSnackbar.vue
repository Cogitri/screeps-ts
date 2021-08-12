<template>
  <v-snackbar v-model="shouldShow" color="success">
    <v-btn icon @click.native="shouldShow = false"><v-icon>mdi-window-close</v-icon></v-btn>
    {{ snackbarMsg }}
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    shouldShow: {
      type: Boolean,
      default: false,
    },
    snackbarMsg: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped></style>

<template>
  <v-app-bar app dark>
    <v-btn icon @click.stop="$emit('toggleDrawer')">
      <v-icon>mdi-cog</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-app-bar-title>
      <div class="text-center text-h3 font-weight-bold">AEM - Screeps</div>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn href="https://gitlab.iue.fh-kiel.de/aem-2021-team-8/screeps" target="_blank" icon>
      <v-icon>mdi-gitlab</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped></style>

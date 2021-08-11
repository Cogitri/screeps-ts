<template>
  <v-container fill-height>
    <v-col cols="12" md="8" align-self="stretch">
      <container-screeps />
    </v-col>
    <v-col cols="12" md="4" align-self="stretch">
      <card-credentials-init />
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CardCredentialsInit from "./CardCredentialsInit.vue";
import ContainerScreeps from "./ContainerScreeps.vue";

export default Vue.extend({
  components: { ContainerScreeps, CardCredentialsInit },
});
</script>

<style scoped></style>

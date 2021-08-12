<template>
  <v-container fill-height>
    <v-col cols="12" md="4" align-self="stretch">
      <card-pipeline-deploy />
    </v-col>
    <v-col cols="12" md="8" align-self="stretch">
      <container-screeps />
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CardPipelineDeploy from "@/components/CardPipelineDeploy.vue";
import ContainerScreeps from "./ContainerScreeps.vue";

export default Vue.extend({
  components: {
    CardPipelineDeploy,
    ContainerScreeps,
  },
});
</script>

<style scoped></style>

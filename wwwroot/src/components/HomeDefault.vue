<template>
  <v-container fill-height>
    <v-col cols="12" md="6" align-self="stretch">
      <card-pipeline-deploy />
    </v-col>
    <v-col cols="12" md="6" align-self="stretch"> </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CardPipelineDeploy from "@/components/CardPipelineDeploy.vue";

export default Vue.extend({
  components: {
    CardPipelineDeploy,
  },
});
</script>

<style scoped></style>

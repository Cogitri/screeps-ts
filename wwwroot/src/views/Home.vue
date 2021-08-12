<template>
  <home-init v-if="$store.state.shouldShowInit" />
  <home-default v-else />
</template>

<script lang="ts">
import HomeDefault from "@/components/HomeDefault.vue";
import HomeInit from "@/components/HomeInit.vue";
import Vue from "vue";

export default Vue.extend({
  components: { HomeInit, HomeDefault },
  name: "Home",
});
</script>

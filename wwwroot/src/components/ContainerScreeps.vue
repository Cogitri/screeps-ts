<template>
  <iframe id="frame" :src="link" frameborder="0"></iframe>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    link: {
      type: String,
      default: "https://screeps.com/a/#!/shards",
    },
  },
});
</script>

<style scoped>
#frame {
  width: 100%;
  height: 100%;
}
</style>

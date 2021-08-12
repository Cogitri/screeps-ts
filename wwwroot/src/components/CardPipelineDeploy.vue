<template>
  <v-card height="100%" max-height="100%" :loading="loading || loadingDeploy">
    <v-card-title primary-title>
      <h1 class="text-h1">Deployment</h1>
    </v-card-title>
    <br />
    <v-card-text v-if="data">
      <h2 class="text-h4">
        Current Pipeline Status:
        <span
          :class="
            data.status === 'success'
              ? 'green--text'
              : data.status === 'failed' || data.status === 'canceled' || data.status === 'skipped'
              ? 'red--text'
              : ''
          "
        >
          {{ data.status }}
        </span>
      </h2>
      <br />
      <div v-if="data.status === 'success'">
        <p>
          The codebase successfully deployed to your game, you can now go ingame, select a server and a room, and start
          playing the game, have fun and good luck!
        </p>
      </div>
      <div v-else-if="data.status === 'failed' || data.status === 'canceled' || data.status === 'skipped'">
        <p>
          The pipeline has failed! Please try deploying again and come back in a few minutes to check on the progress.
          If this problem persists, please report the incident to us.
        </p>
      </div>
      <div v-else>
        <p>
          The pipeline is currently working on deploying the codebase to your game. <br />
          If this state persists, try manually re-deploying, or contact us if this doesn't fix your problem.
        </p>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="deploy()" :disabled="loadingDeploy" :loading="loadingDeploy" block tile color="primary"
        >Deploy</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      loading: false,
      loadingDeploy: false,
      data: undefined,
    };
  },
  mounted() {
    this.fetchPipelineStatus();
  },
  methods: {
    async fetchPipelineStatus() {
      const pipelineId = this.$cookies.get("pipeline-id");

      if (!pipelineId) {
        console.log("no pipeline id");
        return;
      }

      try {
        this.loading = true;

        const response = await axios.get(`/api/v4/projects/659/pipelines/${pipelineId}`);

        if (response.status >= 400) {
          throw response;
        }

        this.data = await response.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    async deploy() {
      const token = this.$cookies.get("auth-token");

      if (!token) {
        console.log("no token");
        return;
      }

      try {
        const response = await axios.post("/api/v4/projects/659/pipeline?ref=master", {
          key: "SCREEPS_MASTER_DEPLOY",
          variable_type: "string",
          value: token,
        });

        if (response.status >= 400) {
          throw response;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
</script>

<style scoped></style>

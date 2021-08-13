<template>
  <v-card height="100%" max-height="100%" v-if="data" :loading="loading">
    <v-card-title primary-title>
      <h1 class="text-lg-h1 text-h2">Deployment</h1>
    </v-card-title>
    <br />
    <v-card-text v-if="data">
      <h2 class="text-lg-h4 text-h5">
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
          The codebase was successfully deployed to your game, you can now go ingame, select a server and a room, and
          start playing the game, have fun and good luck!
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
      <v-btn
        @click="deploy()"
        :disabled="loadingDeploy || data.status === 'running' || data.status === 'pending'"
        :loading="loadingDeploy || data.status === 'running' || data.status === 'pending'"
        block
        tile
        color="primary"
      >
        Deploy
      </v-btn>
    </v-card-text>
    <v-container>
      <v-divider></v-divider>
    </v-container>
    <v-card-title primary-title>
      <h1 class="text-lg-h1 text-h2">Settings</h1>
    </v-card-title>
    <v-card-text>
      <p>
        If you ever need to change your auth token, you can do so here. <br />
        If you no longer wish to use our service, you can simply delete your provided token in the Screeps settings.
      </p>
      <validation-observer ref="observer" v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <validation-provider v-slot="{ errors }" rules="required" name="token">
            <v-text-field
              type="password"
              label="Auth Token"
              :error-messages="errors"
              v-model="authToken"
              required
            ></v-text-field>
          </validation-provider>
          <v-btn
            tile
            block
            color="primary"
            type="submit"
            :disabled="invalid || data.status === 'running' || data.status === 'pending'"
            >{{
              data.status === "running" || data.status === "pending" ? "Waiting for pipeline to finish" : "Change Token"
            }}</v-btn
          >
        </form>
      </validation-observer>
    </v-card-text>
    <v-snackbar v-model="snackbarProps.show" :color="snackbarProps.color">
      <v-btn icon @click.native="snackbarProps.show = false"><v-icon>mdi-window-close</v-icon></v-btn>
      {{ snackbarProps.msg }}
    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import globals from "@/globals";

export default Vue.extend({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      loading: false,
      loadingDeploy: false,
      data: undefined,
      authToken: "",
      snackbarProps: {
        show: false,
        msg: "",
        color: "primary",
      },
    };
  },
  async beforeMount() {
    await this.fetchPipelineStatus();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (this.data && ((this.data as any).status === "running" || (this.data as any).status === "pending")) {
      await this.pollApi();
    }
  },
  methods: {
    async fetchPipelineStatus() {
      const pipelineId = this.$cookies.get("pipeline-id");

      if (!pipelineId) {
        this.snackbarProps.show = true;
        this.snackbarProps.msg =
          "There is no pipeline ID set, the project will still deploy but there may be no changes";
        this.snackbarProps.color = "warning";
        return;
      }

      try {
        this.loading = true;

        const response = await axios.get(`${globals.GITLAB_API_URL}s/${pipelineId}`);

        if (response.status >= 400) {
          throw response;
        }

        this.data = await response.data;
      } catch (e) {
        if (e.status) {
          this.snackbarProps.show = true;
          this.snackbarProps.msg =
            "The server encountered an error loading the pipeline status, please try again later!";
          this.snackbarProps.color = "error";
        } else {
          this.snackbarProps.show = true;
          this.snackbarProps.msg = "There was an error fetching the pipeline status, please try reloading";
          this.snackbarProps.color = "error";
        }
      } finally {
        this.loading = false;
      }
    },
    async deploy() {
      const token = this.$cookies.get("auth-token");

      if (!token) {
        this.snackbarProps.show = true;
        this.snackbarProps.msg =
          "Your deploy token was deleted! Please refresh the page, you will be prompted to enter the token again";
        this.snackbarProps.color = "error";
        return;
      }

      try {
        this.loadingDeploy = true;
        const response = await axios.post(globals.GITLAB_API_URL, {
          ref: "master",
          variables: [
            {
              key: globals.GITLAB_ENV_VAR,
              variable_type: "env_var",
              value: token,
            },
          ],
        });

        if (response.status >= 400) {
          throw response;
        }

        const data = await response.data;

        this.$cookies.set("pipeline-id", data.id);

        await this.pollApi();
      } catch (e) {
        if (e.status) {
          this.snackbarProps.show = true;
          this.snackbarProps.msg = "The server encountered an error trying to deploy, please try again later!";
          this.snackbarProps.color = "error";
        }
      }
    },
    async pollApi() {
      try {
        this.loadingDeploy = true;
        const MAX_POLLS = 50;

        for (let i = 0; i < MAX_POLLS; i++) {
          if (
            await new Promise<boolean>((resolve) => {
              return setTimeout(async () => {
                await this.fetchPipelineStatus();
                if (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (this.data as any).status === "success" ||
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (this.data as any).status === "failed" ||
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (this.data as any).status === "canceled"
                ) {
                  resolve(true);
                } else {
                  resolve(false);
                }
              }, 10000);
            })
          ) {
            break;
          }
        }
      } catch (e) {
        // do nothing lmao
      } finally {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.data && (this.data as any).status !== "success") {
          // TODO: Emit stuff
          this.snackbarProps.show = true;
          this.snackbarProps.msg =
            "The pipeline didn't finish successfully.\nIf it is still in the 'running' state, it takes longer than expected.\nRefresh the page in a few minutes or contact us if we ";
          this.snackbarProps.color = "warn";
        }
        this.loadingDeploy = false;
      }
    },
    changeToken() {
      this.$cookies.set("auth-token", this.authToken);
    },
  },
});
</script>

<style scoped></style>

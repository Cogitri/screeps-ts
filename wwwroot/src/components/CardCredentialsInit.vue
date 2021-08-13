<template>
  <v-card height="100%" max-height="100%">
    <v-card-title primary-title>
      <h1 class="text-h1">Deployment</h1>
    </v-card-title>
    <v-card-text height="100%">
      <v-card-title>
        <h2 class="text-h4">Steps:</h2>
      </v-card-title>
      <v-list>
        <v-list-item> 1. Login with your Screeps account credentials </v-list-item>
        <v-list-item> 2. Under "Add new Auth token", select "Full access" </v-list-item>
        <v-list-item> 3. Give a matching description (e.g. "screeps-aem-auto") </v-list-item>
        <v-list-item> 4. Click on "Generate token" and copy/save the shown token</v-list-item>
        <v-list-item> 5. Confirm with "OK" and enter the token into the text field below</v-list-item>
        <v-list-item> 6. Click on submit and wait until the setup is finished * </v-list-item>
        <v-list-item>
          (* You will be either redirected or notified in the case of an error once the setup finished on our end)
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-container>
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
          <v-btn color="success" tile block :disabled="invalid" type="submit">Submit</v-btn>
        </form>
      </validation-observer>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import globals from "@/globals";
import { mapMutations } from "vuex";
import axios from "axios";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default Vue.extend({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      authToken: "",
    };
  },
  methods: {
    ...mapMutations(["setShouldShowInit"]),
    async submit() {
      this.$cookies.remove("auth-token");
      try {
        const response = await axios.post(globals.GITLAB_API_URL, {
          variables: [
            {
              key: globals.GITLAB_ENV_VAR,
              variable_type: "env_var",
              value: this.authToken,
            },
          ],
        });

        if (response.status >= 400) {
          throw response;
        }

        const data = await response.data;

        this.$cookies.set("auth-token", this.authToken);
        this.$cookies.set("pipeline-id", data.id);

        this.setShouldShowInit(false);
      } catch (e) {
        console.log(e);
      }
    },
  },
});
</script>

<style scoped></style>

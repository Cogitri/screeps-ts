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
          <v-btn color="success" block :disabled="invalid" type="submit">Submit</v-btn>
        </form>
      </validation-observer>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import globals from "@/globals";
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
    async submit() {
      this.$cookies.remove("auth-token");
      try {
        console.log("asdhasudgauygu");

        const response = await axios.post(
          // "https://gitlab.cogitri.dev/projects/659/pipeline?ref=master",
          // "https://gitlab.cogitri.dev/posts",
          // "https://gitlab.iue.fh-kiel.de/projects/659/pipeline?ref=master",
          "http://localhost:80/api/projects/659/pipeline?ref=master",
          {
            key: "SCREEPS_MASTER_DEPLOY",
            variable_type: "string",
            value: this.authToken,
          },
          {
            headers: {
              "PRIVATE-TOKEN": "VCy54Ht8PMLvpd_XUWtG",
            },
          }
        );

        console.log(response);

        if (response.status !== 200) {
          throw response;
        }

        this.$cookies.set("auth-token", this.authToken);

        const data = await response.data;

        console.log(data);
      } catch (e) {
        console.log(e);
      }
    },
  },
});
</script>

<style scoped></style>

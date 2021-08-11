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
      <v-text-field></v-text-field>
      <v-btn flat color="success" block>Submit</v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped></style>

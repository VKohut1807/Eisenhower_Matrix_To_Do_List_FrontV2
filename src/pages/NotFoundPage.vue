<template>
  <v-layout
    ><v-container class="mt-15 d-flex flex-column" fill-height>
      <v-alert
        color="pink"
        dark
        border="top"
        icon="mdi-home"
        transition="scale-transition"
      >
        The page you are trying to get to never existed in this reality, or has
        migrated to a parallel universe. <br />
        Try going back to home page and repeating your action. Or, contact
        helpdesk for support.
      </v-alert>
      <v-btn x-large class="text-center ml-auto" color="primary" to="/"
        >Return to reality</v-btn
      ></v-container
    >
  </v-layout>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style>
</style>
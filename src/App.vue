<template>
  <v-app>
    <v-app-bar app>
      <v-header />
    </v-app-bar>

    <v-main>
      <v-container><router-view></router-view></v-container>
    </v-main>

    <v-footer app />
  </v-app>
</template>

<script>
import VHeader from "@/pages/HeaderFooter/VHeader.vue";
import VFooter from "@/pages/HeaderFooter/VFooter.vue";

export default {
  name: "App",
  components: {
    VHeader,
    VFooter,
  },
};
</script>

<style>
</style>
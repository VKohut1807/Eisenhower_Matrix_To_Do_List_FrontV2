<template>
  <v-footer padless class="mt-auto">
    <v-card tile class="text-center flex">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon color="blue">
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>
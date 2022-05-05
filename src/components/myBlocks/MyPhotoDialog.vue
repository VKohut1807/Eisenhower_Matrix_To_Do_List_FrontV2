<template>
  <v-card>
    <v-img :src="task.avatar.url" contain max-height="600" class="grey darken-4"></v-img>
    <v-card-title> {{ task.name }}</v-card-title>
    <v-card-subtitle class="mt-1">{{ task.description }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "my-photo-dialog",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>
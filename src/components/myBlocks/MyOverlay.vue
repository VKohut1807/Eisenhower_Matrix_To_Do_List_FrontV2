<template>
  <v-overlay :value="alertWindow" z-index="99999">
    <v-btn @click="$emit('alertClose', false)" :color="alertType" elevation="24" x-large class="white--text">
      {{ alertText }}
      <v-icon right>
        mdi-close
      </v-icon>
    </v-btn>
  </v-overlay>
</template>

<script>
export default {
  name: "my-overlay",
  props: {
    alertWindow: {
      type: Boolean,
      required: true,
    },
    alertText: {
      type: String,
      required: true,
    },
    alertType: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
</style>
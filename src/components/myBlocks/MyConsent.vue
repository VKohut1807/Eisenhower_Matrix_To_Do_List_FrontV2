<template>
  <v-card>
    <v-card-title class="text-h6">
      {{ termsSelectConsent ? consent.terms.title : consent.conditions.title }}
    </v-card-title>
    <v-card-text v-for="n in 5" :key="n">
      {{ termsSelectConsent ? consent.terms.text : consent.conditions.text }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="purple" @click="closeConsent()"> Ok </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    termsSelectConsent: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    consent: {
      terms: {
        title: "Terms",
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt nam suscipit itaque qui aperiam earum nisi optio facere, rem provident enim, eos dolorum quia necessitatibus numquam vitae laboriosam! Unde, maxime!",
      },
      conditions: {
        title: "Conditions",
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt nam suscipit itaque qui aperiam earum nisi optio facere, rem provident enim, eos dolorum quia necessitatibus numquam vitae laboriosam! Unde, maxime! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt nam suscipit itaque qui aperiam earum nisi optio facere, rem provident enim, eos dolorum quia necessitatibus numquam vitae laboriosam! Unde, maxime!",
      },
    },
  }),
  methods: {
    closeConsent() {
      this.$emit("closeConsent");
    },
  },
};
</script>

<style>
</style>
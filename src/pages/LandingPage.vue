<template>
  <v-container fluid>
    <v-card elevation="24">
      <v-responsive class="d-flex flex-column align-center">
        <v-img class="ma-1" max-width="700px" src="@/img/matrixImg.png"></v-img>
      </v-responsive>
      <v-card-title primary-title>
        <div>{{ landingText }}</div>
      </v-card-title>
      <v-card-actions class="d-flex">
        <v-btn class="text-center" text color="primary" to="/about"
          >See more... </v-btn
        ><v-spacer></v-spacer>or<v-spacer></v-spacer
        ><v-btn class="text-center" text color="primary" to="/tasks"
          >...To tasks
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "LandingPage",
  data: () => ({
    landingText:
      "Most people spend time deciding their priorities. Eisenhower Matrix: A Simple Tool for Distributing Problems",
  }),
};
</script>
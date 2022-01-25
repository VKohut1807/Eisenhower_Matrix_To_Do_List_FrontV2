<template>
  <v-btn
    x-large
    v-scroll="onScroll"
    v-show="fab"
    fab
    dark
    fixed
    bottom
    right
    color="primary"
    @click="toTop"
  >
    <v-icon>mdi-chevron-up</v-icon>
  </v-btn>
</template>

<script>
export default {
  data: () => ({
    fab: false,
    offsetTop: 500,
  }),
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > this.offsetTop;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>

<style>
</style>
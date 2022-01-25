<template>
  <v-flex class="d-flex flex-wrap align-center">
    <v-chip-group v-for="quadrant in quadrants" :key="quadrant.color">
      <my-chip
        :quadrant="quadrant"
        :completedOrNot="completedOrNot"
        :tasks="tasks"
        @filterClose="filterClose"
      />
    </v-chip-group>
  </v-flex>
</template>

<script>
import MyChip from "@/components/myBlocks/MyChip.vue";
export default {
  components: { MyChip },
  props: {
    quadrants: {
      type: Array,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
    completedOrNot: {
      type: Object,
      required: true,
    },
  },

  data: () => ({}),
  methods: {
    filterClose(color, completed) {
      return this.$emit("filterClose", color, completed);
    },
  },
};
</script>

<style>
</style>
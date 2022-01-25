<template>
  <v-chip
    v-if="numberOfTasks(quadrant.color, completedOrNot.valueBoolean) > 0"
    @click="filterClose(quadrant.color, completedOrNot.valueBoolean)"
    class="mr-4"
    :color="quadrant.colorHex"
    dark
  >
    <v-tooltip bottom :color="quadrant.colorHex">
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <v-avatar left
            ><v-icon>{{ completedOrNot.icon }}</v-icon> </v-avatar
          >{{ completedOrNot.name }}
          <v-avatar right class="darken-3" :color="quadrant.color"
            >{{ numberOfTasks(quadrant.color, completedOrNot.valueBoolean) }}
          </v-avatar>
        </div>
      </template>
      <span>Close this tasks</span>
    </v-tooltip>
  </v-chip>
</template>

<script>
export default {
  props: {
    quadrant: {
      type: Object,
      required: true,
    },
    completedOrNot: {
      type: Object,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },

  data: () => ({}),
  methods: {
    numberOfTasks(color, completed) {
      const taskNumbers = this.tasks
        .filter((task) => task.completed === completed)
        .filter((task) => task.quadrant.color == color).length;
      return taskNumbers;
    },
    filterClose(color, completed) {
      return this.$emit("filterClose", color, completed);
    },
  },
};
</script>

<style>
</style>
<template>
  <v-sheet>
    <v-list>
      <v-container class="d-flex pa-0 mb-5">
        <v-spacer></v-spacer>
        <add-task-dialog :quadrants="quadrants" @addTask="addTask" @fileUpload="fileUpload" fluid />
      </v-container>
      <v-container class="pa-0">
        <div class="d-flex">
          <h2 class="text-h6">Filters:</h2>
          <v-spacer></v-spacer>
          <v-btn text @click="filtersReset()" color="warning" dark>
            <v-icon>mdi-cached</v-icon>
            filters
          </v-btn>
        </div>
        <div>
          <filter-group :quadrants="quadrants" :tasks="tasks" :completedOrNot="tasksNotCompleted"
            @filterClose="filterClose" />
          <filter-group :quadrants="quadrants" :tasks="tasks" :completedOrNot="tasksCompleted"
            @filterClose="filterClose" />
        </div>
      </v-container>
      <iterator-group :tasks="tasks" :quadrants="quadrants" @deleteTask="deleteTask" @replaceTask="replaceTask"
        @fileUpload="fileUpload" />
    </v-list>
  </v-sheet>
</template>

<script>
import AddTaskDialog from "@/components/AddTaskDialog.vue";
import FilterGroup from "@/components/FilterGroup.vue";
import IteratorGroup from "@/components/IteratorGroup.vue";
export default {
  props: {
    quadrants: {
      type: Array,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  components: { AddTaskDialog, FilterGroup, IteratorGroup },
  data: () => ({
    tasksCompleted: {
      name: "Completed",
      icon: "mdi-checkbox-marked-circle-outline",
      valueBoolean: true,
    },
    tasksNotCompleted: {
      name: "Not Completed",
      icon: "mdi-alert-circle-outline",
      valueBoolean: false,
    },
  }),
  methods: {
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
    addTask(task) {
      this.$emit("addTask", task);
    },
    fileUpload(file) {
      this.$emit("fileUpload", file);
    },
    replaceTask(changedTask) {
      this.$emit("replaceTask", changedTask);
    },
    filterClose(color, completed) {
      this.$emit("filterClose", color, completed);
    },
    filtersReset() {
      this.$emit("filtersReset", this.tasks.length);
    },
  },
};
</script>

<style scoped>
</style>
    
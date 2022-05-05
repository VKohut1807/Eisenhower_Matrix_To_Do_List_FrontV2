<template>
  <v-data-iterator :items="tasks" :items-per-page.sync="itemsPerPage" :page.sync="page" :search="search"
    :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" hide-default-footer>
    <template v-slot:header>
      <v-toolbar dark color="primary " class="mb-1">
        <v-text-field v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify"
          label="Search"></v-text-field>
        <template>
          <v-spacer></v-spacer>
          <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys" prepend-inner-icon="mdi-magnify"
            label="Sort by"></v-select>
          <v-spacer></v-spacer>
          <v-btn-toggle v-model="sortDesc" mandatory>
            <v-btn large depressed color="blue" :value="false">
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn large depressed color="blue" :value="true">
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
          </v-btn-toggle>
        </template>
      </v-toolbar>
      <template v-if="tasks.length > 3">
        <pagination-and-selection :tasks="tasks" :page="page" :itemsPerPage="itemsPerPage"
          :itemsPerPageArray="itemsPerPageArray" :numberOfPages="numberOfPages" @nextPage="nextPage"
          @formerPage="formerPage" @updateItemsPerPage="updateItemsPerPage" />
      </template>
    </template>

    <template v-slot:default="props">
      <v-card v-for="(task, index) in props.items" :key="task.id" class="ma-3">
        <task-one :task="task" :index="index" :quadrants="quadrants" :sortBy="sortBy" @deleteTask="deleteTask"
          @replaceTask="replaceTask" @fileUpload="fileUpload" />
      </v-card>
    </template>
    <template v-slot:footer v-if="tasks.length">
      <pagination-and-selection :tasks="tasks" :page="page" :itemsPerPage="itemsPerPage"
        :itemsPerPageArray="itemsPerPageArray" :numberOfPages="numberOfPages" @nextPage="nextPage"
        @formerPage="formerPage" @updateItemsPerPage="updateItemsPerPage" />
    </template>
  </v-data-iterator>
</template>

<script>
import TaskOne from "@/components/TaskOne.vue";
import PaginationAndSelection from "@/components/PaginationAndSelection.vue";
export default {
  name: "IteratorGroup",
  components: {
    TaskOne,
    PaginationAndSelection,
  },
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

  data: () => ({
    search: "",
    sortBy: "id",
    sortDesc: false,
    keys: [
      "ID",
      "Name",
      "Completed",
      "Date",
      "Description",
      "Quadrant.prioryty",
    ],

    page: 1,
    itemsPerPage: 3,
    itemsPerPageArray: [3, 6, 9, "All"],

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

    replaceTask(changedTask) {
      return this.$emit("replaceTask", changedTask);
    },

    fileUpload(file) {
      this.$emit("fileUpload", file);
    },

    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },

    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },

    updateItemsPerPage(number) {
      if (number === "All") {
        return (this.itemsPerPage = this.tasks.length);
      }
      return (this.itemsPerPage = number);
    },

    filterClose(color, completed) {
      return this.$emit("filterClose", color, completed);
    },
    filtersReset() {
      return this.$emit("filtersReset", this.tasks.length);
    },
    openDialogImg(task) {
      this.$emit("openDialogImg", task);
    },
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.tasks.length / this.itemsPerPage);
    },
  },
};
</script>

<style>
</style>
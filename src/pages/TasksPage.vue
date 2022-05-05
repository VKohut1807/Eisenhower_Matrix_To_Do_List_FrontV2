<template>
  <v-sheet>
    <tasks-list :quadrants="quadrants" :tasks="tasks" @deleteTask="deleteTask" @addTask="addTask"
      @fileUpload="fileUpload" @filterClose="filterClose" @filtersReset="filtersReset" @replaceTask="replaceTask" />
    <my-loader v-if="loading" />
    <my-scroll-btn></my-scroll-btn>
    <my-overlay :alertWindow="alertWindow" :alertText="alertText" :alertType="alertType" @alertClose="alertClose" />
  </v-sheet>
</template>

<script>
import TasksList from "@/components/TasksList.vue";
import MyScrollBtn from "@/components/myBlocks/MyScrollBtn.vue";
import MyLoader from "@/components/myBlocks/MyLoader.vue";
import MyOverlay from "@/components/myBlocks/MyOverlay.vue";
const API_URL_TASKS = "http://localhost:4000/tasks";
const API_URL_IMG = "http://localhost:4000/tasks/file";

export default {
  components: { TasksList, MyLoader, MyScrollBtn, MyOverlay },
  name: "TasksPage",
  data: () => ({
    tasks: [],
    loading: true,
    colors: ["#48C854", "#44D9E6", "#FF332F", "#A8A8A8"],
    quadrants: [
      {
        prioryty: 1,
        title: "URGENT & IMPORTANT",
        color: "green",
        colorHex: "#48C854",
      },
      {
        prioryty: 2,
        title: "NOT URGENT & IMPORTANT",
        color: "blue",
        colorHex: "#44D9E6",
      },
      {
        prioryty: 3,
        title: "URGENT & NOT IMPORTANT",
        color: "red",
        colorHex: "#FF332F",
      },
      {
        prioryty: 4,
        title: "NOT URGENT & NOT IMPORTANT",
        color: "grey",
        colorHex: "#A8A8A8",
      },
    ],
    quadrant: {
      prioryty: 4,
      title: "NOT URGENT & NOT IMPORTANT",
      color: "grey",
      colorHex: "#A8A8A8",
    },
    alertWindow: false,
    alertText: "",
    alertType: ""
  }),
  mounted() {
    this.tasksList();
  },

  methods: {
    async tasksList() {
      this.axios
        .get(API_URL_TASKS)
        .then((res) => {
          this.loading = false;
          if (!res.data.length == 0) {
            this.tasks = res.data;
          } else {
            this.tasks = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async addTask(newTask) {
      await this.axios
        .post(API_URL_TASKS, newTask)
        .then((res) => {
          console.log(res.data.message);
          this.tasks.push(newTask);
          this.alertWindow = true;
          this.alertText = res.data.message,
            this.alertType = "info"
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async replaceTask(changedTask) {
      console.log("replace", changedTask);
      await this.axios
        .put(API_URL_TASKS, changedTask)
        .then((res) => {
          console.log(res.data.message);
          this.alertWindow = true;
          this.alertText = res.data.message,
            this.alertType = "info"
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteTask(id) {
      await this.axios
        .delete(API_URL_TASKS, { data: { _id: id } })
        .then((res) => {
          console.log(res.data.message);
          this.tasks = this.tasks.filter((t) => t._id !== id);
          this.alertWindow = true;
          this.alertText = res.data.message,
            this.alertType = "info"
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fileUpload(file) {
      await this.axios
        .post(API_URL_IMG, file)
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filterClose(color, completed) {
      this.tasks = this.tasks.filter(
        (task) =>
          (task.completed === completed && task.quadrant.color !== color) ||
          task.completed === !completed
      );
    },
    filtersReset() {
      this.tasks = [];
      this.loading = true;
      return this.tasksList();
    },
    alertClose(bool) {
      this.alertWindow = bool;
    }
  },
};
</script>
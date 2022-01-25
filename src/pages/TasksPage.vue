<template>
  <v-sheet>
    <tasks-list
      :quadrants="quadrants"
      :tasks="tasks"
      @deleteTask="deleteTask"
      @addTask="addTask"
      @filterClose="filterClose"
      @filtersReset="filtersReset"
      @replaceTask="replaceTask"
    />
    <my-loader v-if="loading" />
    <my-scroll-btn></my-scroll-btn>
  </v-sheet>
</template>

<script>
import TasksList from "@/components/TasksList.vue";
import MyScrollBtn from "@/components/myBlocks/MyScrollBtn.vue";
import MyLoader from "@/components/myBlocks/MyLoader.vue";

export default {
  components: { TasksList, MyLoader, MyScrollBtn },
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
  }),
  mounted() {
    this.fetchTasksList();
  },
  methods: {
    addTask(newTask) {
      this.tasks.push(newTask);
    },

    replaceTask(changedTask) {
      this.tasks.filter((task) => {
        if (task.id == changedTask.id) {
          if (changedTask.avatar !== null) {
            changedTask = changedTask;
          } else {
            changedTask.avatar = {
              avatar: {
                name: "",
                type: "",
                size: 0,
                url: "https://picsum.photos/500/300",
              },
            };
          }
          return (task = changedTask);
        }
      });
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
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
      return this.fetchTasksList();
    },

    randomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },

    async fetchTasksList() {
      this.axios
        .get("https://jsonplaceholder.typicode.com/todos?_limit=12")
        .then((res) => {
          const json = res.data;
          setTimeout(() => {
            for (let key in json) {
              this.tasks.push({
                id: json[key].id,
                name: `Do the task ${json[key].id}`,
                description: json[key].title,
                avatar: {
                  name: "",
                  type: "",
                  size: 0,
                  url: "https://picsum.photos/500/300",
                },
                completed: json[key].completed,
                quadrant:
                  this.quadrants[
                    this.randomInteger(0, this.quadrants.length - 1)
                  ],
                date: new Date().toLocaleString(),
              });
            }
            this.loading = false;
          }, 300);
        });
    },
  },
};
</script>
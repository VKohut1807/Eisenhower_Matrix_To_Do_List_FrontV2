<template>
  <v-list-item>
    <v-list-item-action>
      <v-switch disabled v-model="task.completed" inset></v-switch>
    </v-list-item-action>
    <v-row class="d-flex flex-column pa-3">
      <div class="d-flex justify-space-between">
        <v-list-item-content>
          <div class="overline">{{ task._id }}</div>
          <h2 class="headline mb-1 overflow-x-auto">{{ task.name }}</h2>
          <p class="ma-0">{{ task.description }}</p>
          <v-spacer></v-spacer>
        </v-list-item-content>

        <v-list-item-avatar :color="task.quadrant.colorHex" tile size="80">
          <v-dialog width="75%" transition="dialog-top-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-avatar v-bind="attrs" v-on="on" size="65" color="white" class="mx-auto pointer">
                <v-img :src="task.avatar.url"></v-img>
              </v-list-item-avatar>
            </template>
            <my-photo-dialog :task="task" />
          </v-dialog>
        </v-list-item-avatar>
      </div>
      <div class="d-flex justify-space-between align-center">
        <p class="ma-0">{{ new Date(task.date).toLocaleString() }}</p>
        <v-spacer></v-spacer>
        <v-dialog v-if="sortBy.toLowerCase() == 'id'" v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text color="warning">Edit</v-btn>
          </template>
          <my-form :quadrants="quadrants" :editDialog="editDialog" :editTask="task" @replace="replaceTask"
            @fileUpload="fileUpload" @close="close" />
        </v-dialog>
        <v-btn v-on:click="task.completed = !task.completed" @click="$emit('deleteTask', task._id)" text color="error"
          class="px-0">Delete</v-btn>
      </div>
    </v-row>
  </v-list-item>
</template>

<script>
import MyForm from "@/components/myBlocks/MyForm.vue";
import MyPhotoDialog from "@/components/myBlocks/MyPhotoDialog.vue";
export default {
  name: "task-one",
  components: { MyForm, MyPhotoDialog },
  props: {
    task: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    quadrants: {
      type: Array,
      required: true,
    },
    sortBy: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    editDialog: true,
    dialogImg: false,
  }),
  methods: {
    close() {
      this.dialog = false;
    },
    replaceTask(changedTask) {
      this.dialog = false;
      this.$emit("replaceTask", changedTask);
    },
    fileUpload(file) {
      this.$emit("fileUpload", file);
    },
  },
};
</script>


<style>
</style>

    
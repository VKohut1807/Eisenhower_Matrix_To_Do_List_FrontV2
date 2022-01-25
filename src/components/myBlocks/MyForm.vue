<template>
  <v-form ref="form" v-model="valid">
    <v-card>
      <v-card-title>
        <span class="text-h5">Task</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-switch
                v-if="editDialog"
                v-model="task.completed"
                :label="`Completed: ${task.completed}`"
                inset
              >
              </v-switch>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model.trim="task.name"
                :color="task.quadrant.colorHex"
                label="Task Name*"
                hint="short and clear name"
                :counter="10"
                :rules="nameRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-file-input
                @change="withoutImg()"
                v-model="task.avatar"
                :rules="imgRules"
                hint="only img files"
                prepend-icon="mdi-camera"
                accept="image/*"
                label="Img input"
              ></v-file-input>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="task.description"
                :color="task.quadrant.colorHex"
                label="Task Title*"
                hint="describe clearly a specific task"
                :counter="30"
                :rules="descriptionRules"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="task.quadrant"
                :hint="`${task.quadrant.color}, ${task.quadrant.colorHex}`"
                :color="task.quadrant.colorHex"
                :items="quadrants"
                item-text="title"
                item-value="color"
                label="Priority"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="resetForm" color="warning " text> Reset form </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="close" color="error" text> Close </v-btn>
        <v-btn
          v-if="!editDialog"
          @click="send"
          :disabled="!valid"
          color="success"
          text
        >
          Send
        </v-btn>
        <v-btn v-else :disabled="!valid" @click="replace" color="success" text>
          Replace
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "my-form",
  props: {
    editTask: {
      type: Object,
      required: false,
    },
    quadrants: {
      type: Array,
      required: true,
    },
    editDialog: {
      type: Boolean,
      required: false,
    },
  },

  data: () => ({
    files: [],

    valid: true,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    descriptionRules: [
      (v) => !!v || "Description is required",
      (v) =>
        (v && v.length <= 30) || "Description must be less than 30 characters",
    ],
    imgRules: [
      (v) => !v || v.size < 10000000 || "Img size should be less than 10 MB!",
    ],
    task: {
      completed: false,
      name: "",
      description: "",
      avatar: {
        name: "",
        type: "",
        size: 0,
        url: "",
      },
      quadrant: {
        prioryty: 4,
        title: "NOT URGENT & NOT IMPORTANT",
        color: "grey",
        colorHex: "#A8A8A8",
      },
    },
  }),
  mounted() {
    this.editDialogTask();
  },
  methods: {
    send() {
      if (this.$refs.form.validate()) {
        const newTask = {
          id: Date.now(),
          name: this.task.name,
          description: this.task.description,
          completed: false,
          quadrant: this.task.quadrant,
          date: new Date().toLocaleString(),
          avatar: {
            name: this.task.avatar.name,
            type: this.task.avatar.type,
            size: this.task.avatar.size,
            url: this.task.avatar.url,
          },
        };
        if (newTask.avatar.size > 0) {
          this.fileReaderImg(this.task, newTask);
        }
        this.$emit("addTask", newTask);
        this.resetForm();
      }
    },
    close() {
      this.$emit("close");
    },
    replace() {
      if (this.$refs.form.validate()) {
        this.task.date = new Date().toLocaleString();
        if (this.task.avatar.size > 0) {
          this.fileReaderImg(this.task, this.task);
        }
        return this.$emit("replace", this.task);
      }
    },
    editDialogTask() {
      if (this.editDialog) {
        this.task = this.editTask;
      }
    },
    withoutImg() {
      if (this.task.avatar == null) {
        return (this.task.avatar = {
          name: "",
          type: "",
          size: 0,
          url: "",
        });
      }
    },
    resetForm() {
      this.$refs.form.reset();
      this.task.completed = false;
      this.task.quadrant = {
        prioryty: 4,
        title: "NOT URGENT & NOT IMPORTANT",
        color: "grey",
        colorHex: "#A8A8A8",
      };
    },
    fileReaderImg(taskFrom, taskTo) {
      const reader = new FileReader();
      reader.readAsDataURL(taskFrom.avatar);
      reader.onload = () => {
        return (taskTo.avatar = {
          name: taskTo.avatar.name,
          type: taskTo.avatar.type,
          size: taskTo.avatar.size,
          url: reader.result,
        });
      };
    },
  },
};
</script>

<style>
</style>
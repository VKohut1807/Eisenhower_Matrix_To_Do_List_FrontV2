<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Add New Task
      </v-btn>
    </template>
    <my-form :quadrants="quadrants" @addTask="send" @close="close" />
  </v-dialog>
</template>

<script>
import MyForm from "@/components/myBlocks/MyForm.vue";
export default {
  components: { MyForm },
  name: "add-task-dialog",
  props: {
    quadrants: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    send(task) {
      this.$emit("addTask", task);
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>
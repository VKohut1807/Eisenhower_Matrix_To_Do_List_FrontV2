<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card v-show="!registration">
      <my-autorization-form @closeAutorization="closeAutorization()" />
      <small>
        <div class="pa-1 text-center">
          Don't have an account?
          <v-dialog v-model="registration" max-width="400px">
            <template v-slot:activator="{ on, attrs }">
              <a v-bind="attrs" v-on="on"> registration </a>
            </template>
            <v-card>
              <my-autorization-form
                :registration="registration"
                @closeAutorization="closeAutorization()"
              />
            </v-card>
          </v-dialog>
        </div>
      </small>
    </v-card>
  </v-dialog>
</template>

<script>
import MyAutorizationForm from "@/components/myBlocks/MyAutorizationForm.vue";
export default {
  components: { MyAutorizationForm },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    dialog: false,
    registration: false,
  }),
  created() {
    this.dialog = this.value;
  },
  watch: {
    value(newValue) {
      this.dialog = newValue;
    },
    dialog(newValue) {
      this.$emit("input", newValue);
    },
  },
  methods: {
    closeAutorization() {
      if (this.registration) {
        this.registration = false;
      } else {
        this.dialog = false;
      }
    },
  },
};
</script>

<style>
</style>
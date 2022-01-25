<template>
  <v-form ref="form" v-model="valid" @submit.prevent="login()">
    <v-card-title class="text-center d-flex flex-column">
      <div class="text-h4 text-center">
        {{ !registration ? "Enter" : "Registration" }}
      </div>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" v-show="registration">
            <v-text-field
              v-model="user.name"
              :rules="[rules.required, rules.min]"
              label="Name"
              prepend-icon="mdi-account"
              counter
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="user.email"
              :rules="[rules.required, rules.email]"
              label="E-mail"
              prepend-icon="mdi-email"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="user.password"
              @click:append="show = !show"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              label="Password"
              prepend-icon="mdi-lock"
              counter
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" v-show="registration">
            <v-text-field
              v-model="user.passwordRepeat"
              @click:append="showR = !showR"
              :append-icon="showR ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="showR ? 'text' : 'password'"
              label="Repeat Password"
              :hint="passwordsEntered()"
              prepend-icon="mdi-lock"
              counter
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" v-show="registration">
            <v-checkbox
              v-model="user.checkbox"
              :rules="[rules.required]"
              prepend-icon="mdi-security"
            >
              <template v-slot:label>
                <div>
                  Do you accept the
                  <v-dialog
                    v-model="dialogConsent"
                    width="75%"
                    transition="dialog-top-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <a
                        v-bind="attrs"
                        v-on="on"
                        @click.prevent="termsSelectConsent = false"
                        >conditions</a
                      >
                      and
                      <a
                        v-bind="attrs"
                        v-on="on"
                        @click.prevent="termsSelectConsent = true"
                        >terms</a
                      >
                    </template>
                    <my-consent
                      :termsSelectConsent="termsSelectConsent"
                      @closeConsent="closeConsent"
                    /> </v-dialog
                  >?
                </div>
              </template>
            </v-checkbox>
          </v-col>
          <v-col cols="12">
            <div class="d-flex justify-center">
              <v-btn
                @click="closeAutorization()"
                color="error"
                min-width="50%"
                rounded
                text
              >
                Cancel
              </v-btn>
              <v-btn
                :disabled="!valid"
                color="primary"
                type="submit"
                min-width="50%"
                rounded
              >
                {{ !registration ? "Login" : "Registration" }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-form>
</template>

<script>
import MyConsent from "@/components/myBlocks/MyConsent.vue";
export default {
  components: { MyConsent },
  props: {
    registration: {
      type: Boolean,
      required: false,
    },
  },
  data: () => ({
    termsSelectConsent: false,
    dialogConsent: false,

    valid: true,

    user: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      checkbox: false,
    },
    show: false,
    showR: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (value) => value.length >= 5 || "Min 5 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        if (this.registration) {
          console.log("SEND_TO_SERWER__new_USER", this.user);
        } else {
          this.user = {
            email: this.user.email,
            password: this.user.password,
          };
          console.log("SEND_TO_SERWER__login", this.user);
        }
        this.resetForm();
      }
    },
    resetForm() {
      this.user = {
        name: "",
        email: "",
        password: "",
        passwordRepeat: "",
        checkbox: false,
      };
    },
    closeConsent() {
      this.dialogConsent = false;
    },
    closeAutorization() {
      this.resetForm();
      return this.$emit("closeAutorization");
    },
    passwordsEntered() {
      if (
        this.user.passwordRepeat.length >= 5 &&
        this.user.password === this.user.passwordRepeat
      ) {
        return `True`;
      } else {
        return "The passwords you entered do not match";
      }
    },
  },
};
</script>

<style>
</style>
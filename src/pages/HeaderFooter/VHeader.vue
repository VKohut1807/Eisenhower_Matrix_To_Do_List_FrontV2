<template>
  <v-container fluid class="py-0 fill-height">
    <v-dialog v-model="alertWindow">
      <my-overlay :alertWindow="alertWindow" :alertText="alertText" :alertType="alertType" @alertClose="alertClose" />
    </v-dialog>
    <template>
      <v-img max-height="35" max-width="35" src="../../../public/logo.png"></v-img>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon class="hidden-sm-and-up"></v-app-bar-nav-icon>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in menuItems" :key="item.id" :to="item.link" color="blue"
          @click="autorization(item.active)">
          <v-icon>{{ item.icon }}</v-icon>
          &nbsp;{{ item.title }}
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text :key="userDate.id" :to="userDate.link" color="primary">
              <v-icon>{{ userDate.icon }}</v-icon>
              &nbsp;{{ user.name || userDate.title }}
            </v-btn>
          </template>
          <my-user :user="user" @logout="logout" />
        </v-menu>
      </v-toolbar-items>
    </template>
    <autorization-dialog @registr="registr" @login="login" v-model="dialog" />
  </v-container>
</template>

<script>
import AutorizationDialog from "@/components/AutorizationDialog.vue";
import MyUser from "@/components/myBlocks/MyUser.vue";
import MyOverlay from "@/components/myBlocks/MyOverlay.vue";
const API_URL_LOGIN = "http://localhost:4000/login";
const API_URL_REGISTR = "http://localhost:4000/registration";
const API_URL_USER = "http://localhost:4000/user";
const API_URL_LOGOUT = "http://localhost:4000/logout";
export default {
  components: { AutorizationDialog, MyUser, MyOverlay },
  data: () => ({
    dialog: false,
    userDate: {
      id: 4,
      title: "user",
      link: "",
      icon: "mdi-account",
      userDialog: true,
    },
    menuItems: [
      {
        id: 1,
        title: "Home",
        link: "/",
        icon: "mdi-home",
        active: false,
      },
      {
        id: 2,
        title: "Tasks",
        link: "/tasks",
        icon: "mdi-view-grid",
        active: false,
      },
      {
        id: 3,
        title: "Login",
        link: "",
        icon: "mdi-lock",
        active: true,
      },
    ],
    user: {},
    alertWindow: false,
    alertText: "",
    alertType: ""
  }),
  mounted() {
    this.getUser()
  },
  methods: {
    async registr(newUser) {
      await this.axios
        .post(API_URL_REGISTR, newUser)
        .then((res) => {
          if (!res.data.reg) {
            console.log(res.data.message);
            this.alertWindow = true;
            this.alertText = res.data.message,
              this.alertType = "info"
          } else {
            console.log(res.data.message);
            this.alertWindow = true;
            this.alertText = res.data.message,
              this.alertType = "info"
            this.dialog = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async login(user) {
      await this.axios
        .post(API_URL_LOGIN, user, {
          withCredentials: true,
        })
        .then((res) => {
          if (!res.data.log) {
            console.log(res.data);
            this.alertWindow = true;
            this.alertText = res.data.message,
              this.alertType = "info"
          } else {
            console.log(res.data);
            this.alertWindow = true;
            this.alertText = res.data.message,
              this.alertType = "info"
            this.dialog = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getUser() {
      await this.axios
        .get(API_URL_USER, {
          withCredentials: true,
        })
        .then((elem) => {
          if (elem.data.logUser) {
            console.log(elem.data.logUser.name + elem.data.message);
            this.user = elem.data.logUser;
          }
          else {
            console.log(elem.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async logout() {
      await this.axios
        .delete(API_URL_LOGOUT, {
          withCredentials: true,
        })
        .then((res) => {
          if (!res.data.logout) {
            return console.log(res.data.message);
          }
          console.log(res.data.message);
          this.user = {}
          this.alertWindow = true;
          this.alertText = res.data.message,
            this.alertType = "info"
        })
        .catch((error) => {
          console.log(error);
        });
    },
    autorization(activated) {
      if (activated) {
        return (this.dialog = true);
      }
    },
    alertClose(bool) {
      this.alertWindow = bool;
    }
  }
};
</script>


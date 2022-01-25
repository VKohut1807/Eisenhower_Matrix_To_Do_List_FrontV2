<template>
  <v-container fluid class="py-0 fill-height">
    <template>
      <v-img max-height="35" max-width="35" src="../../../public/logo.png">
      </v-img>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon class="hidden-sm-and-up"></v-app-bar-nav-icon>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="item in menuItems"
          :key="item.id"
          :to="item.link"
          color="blue"
          @click="autorization(item.active)"
        >
          <v-icon>{{ item.icon }}</v-icon>
          &nbsp;{{ item.title }}
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              text
              :key="userDate.id"
              :to="userDate.link"
              color="primary"
            >
              <v-icon>{{ userDate.icon }}</v-icon
              >&nbsp;{{ userDate.title }}
            </v-btn>
          </template>
          <my-user />
        </v-menu>
      </v-toolbar-items>
    </template>
    <autorization-dialog v-model="dialog" />
  </v-container>
</template>

<script>
import AutorizationDialog from "@/components/AutorizationDialog.vue";
import MyUser from "@/components/myBlocks/MyUser.vue";
export default {
  components: { AutorizationDialog, MyUser },
  data: () => ({
    dialog: false,
    userDate: {
      id: 4,
      title: "name",
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
  }),
  methods: {
    autorization(activated) {
      if (activated) {
        return (this.dialog = true);
      }
    },
  },
};
</script>


<template>
  <v-card class="mx-auto pb-1" width="200">
    <v-card-text>
      <v-row align="center">
        <v-col class="text-h2" cols="8">
          <v-card-title class="pa-0 mdi mdi-account">
            <span class="ml-3">{{ user.name || "name" }}</span>
          </v-card-title>
        </v-col>
        <v-col cols="4">
          <v-img src="https://cdn.vuetifyjs.com/images/cards/sun.png" alt="Sunny image" width="45"></v-img>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text class="py-0">
      <v-card-subtitle class="pa-0 mdi mdi-email">
        <span class="ml-3">{{ user.email || "email" }}</span>
      </v-card-subtitle>
    </v-card-text>
    <v-card-actions v-show="user.name">
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link class="px-1">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-actions>

    <div v-show="user.name" class="pa-2">
      <v-btn block color="primary" @click="$emit('logout')">Logout</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Account", icon: "mdi-account-box" },
    ],
  }),
};
</script>

<style scoped>
</style>
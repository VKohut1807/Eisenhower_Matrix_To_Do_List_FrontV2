<template>
  <v-list two-line subheader>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sun.png"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ user.name || userDate.title }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-content v-show="user.name">
        <v-btn block x-small outlined color="error" plain @click="$emit('logout')">Logout</v-btn>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item v-for="item in menuItems" :key="item.id" :to="item.link" color="blue"
      @click="autorization(item.active)" link>
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: false,
    },
    userDate: {
      type: Object,
      required: true,
    },
    menuItems: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    autorization(bool) {
      this.$emit("autorization", bool);
    }
  }
}
</script>

<style>
</style>
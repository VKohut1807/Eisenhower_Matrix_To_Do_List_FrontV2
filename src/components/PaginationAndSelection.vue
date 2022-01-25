<template>
  <v-row class="ma-2" align="center" justify="center" v-model="tasks">
    <span class="grey--text">Items per page</span>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
          {{ itemsPerPage }}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(number, index) in itemsPerPageArray"
          :key="index"
          @click="updateItemsPerPage(number)"
        >
          <v-list-item-title>{{ number }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-spacer></v-spacer>

    <span class="mr-4 grey--text">
      Page {{ page }} of {{ numberOfPages }}
    </span>
    <my-tooltip :dataTooltip="tooltipPreviousPage">
      <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </my-tooltip>
    <my-tooltip :dataTooltip="tooltipNextPage">
      <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </my-tooltip>
  </v-row>
</template>

<script>
import MyTooltip from "@/components/myBlocks/MyTooltip.vue";
export default {
  components: { MyTooltip },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    itemsPerPageArray: {
      type: Array,
      required: true,
    },
    numberOfPages: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    tooltipPreviousPage: {
      info: "Previous Page",
      color: "blue",
    },
    tooltipNextPage: {
      info: "Next Page",
      color: "blue",
    },
  }),
  methods: {
    nextPage() {
      return this.$emit("nextPage");
    },

    formerPage() {
      return this.$emit("formerPage");
    },

    updateItemsPerPage(number) {
      return this.$emit("updateItemsPerPage", number);
    },
  },
};
</script>

<style>
</style>
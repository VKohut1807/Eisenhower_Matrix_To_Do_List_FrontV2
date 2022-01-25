<template>
  <v-tooltip bottom :color="dataTooltip.color">
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot></slot>
      </div>
    </template>
    <span>{{ dataTooltip.info }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    dataTooltip: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>
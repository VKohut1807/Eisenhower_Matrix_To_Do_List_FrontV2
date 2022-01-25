<template>
  <v-card>
    <v-parallax
      dark
      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
    >
      <v-card-title class="mb-5 text-h3"> The Eisenhower Method </v-card-title>
      <v-card-subtitle class="text-h6 font-weight-regular">
        Eisenhower's specific professional activities constantly forced him to
        make tough decisions and focus on different tasks every day. To optimize
        the process, he created his own method, which became widely known as the
        Eisenhower matrix.</v-card-subtitle
      >
    </v-parallax>
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <v-timeline>
          <v-timeline-item
            v-for="task in tasks"
            :key="task.id"
            :color="task.color"
            icon="mdi-star"
            large
          >
            <template v-slot:opposite>
              <span class="font-weight-light">
                {{ task.quadrant.toUpperCase() }}
              </span>
            </template>
            <v-card class="elevation-2 ma-5">
              <v-card-title class="headline">{{ task.title }}</v-card-title>
              <v-treeview
                :items="exemples.filter((item) => item.id == task.id)"
                activatable
                open-on-click
                transition
              >
              </v-treeview>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
    <my-scroll-btn></my-scroll-btn>
  </v-card>
</template>

<script>
import MyScrollBtn from "@/components/myBlocks/MyScrollBtn.vue";
export default {
  components: { MyScrollBtn },
  name: "AboutPage",
  data: () => ({
    tasks: [
      {
        id: 1,
        quadrant: "Urgent & Important",
        color: "green",
        title:
          "These receive the highest priority level and should be your primary focus to complete as soon as possible (most often on the same day).",
      },
      {
        id: 2,
        quadrant: "Not Urgent & Important",
        color: "blue",
        title:
          "These are the long-term goals and tasks that are important but don’t have a firm deadline yet.  You should schedule them in a timely manner, doing the most urgent ones right after you’ve finished everything from the “Do” quadrant.",
      },
      {
        id: 3,
        quadrant: "Urgent & Not Important",
        color: "red",
        title:
          "These tasks are the ones you can delegate to other professionals or appoint to complete yourself if you must, but only after your first and second quadrant tasks are completed.",
      },
      {
        id: 4,
        quadrant: "Not Urgent & Not important",
        color: "grey",
        title:
          "The tasks are placed in the “Delete” quadrant because you should eliminate doing them. This may vary due to the perception of urgency and importance, but mainly these tasks don’t even need to be done and would be considered a complete waste of time by most people.",
      },
    ],
    exemples: [
      {
        id: 1,
        name: "Example :",
        children: [
          { id: 1, name: "Covering a project for a colleague out sick" },
          { id: 2, name: "A last-minute deadline is assigned to you" },
          { id: 3, name: "Clients come to you with a pressing problem" },
        ],
      },
      {
        id: 2,
        name: "Example :",
        children: [
          {
            id: 1,
            name: "Learning a new skill, keeping up with current research in your field, attending educational events",
          },
          { id: 2, name: "Exercise and routine healthcare" },
        ],
      },
      {
        id: 3,
        name: "Example :",
        children: [
          {
            id: 1,
            name: "Responding to certain texts, emails, or social media messages",
          },
          { id: 2, name: "Some meetings" },
        ],
      },
      {
        id: 4,
        name: "Example :",
        children: [
          { id: 1, name: "Mindlessly refreshing social media and scrolling" },
          { id: 2, name: "Watching TV for hours" },
        ],
      },
    ],
  }),
};
</script>
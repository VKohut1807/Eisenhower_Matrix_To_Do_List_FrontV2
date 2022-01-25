import Vue from "vue";
import Router from "vue-router";
import LandingPage from "@/pages/LandingPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import AboutPage from "@/pages/AboutPage.vue";
import TasksPage from "@/pages/TasksPage.vue";


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: LandingPage
        },
        {
            path: '/tasks',
            component: TasksPage
        },
        {
            path: '/about',
            component: AboutPage
        },
        {
            path: "*",
            component: NotFoundPage
        }
    ]
})

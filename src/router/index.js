import Vue from "vue";
import VueRouter from "vue-router";
import notFind from "./not-find";
import routerName from "@/common/router-name";

Vue.use(VueRouter);

const routes = [
    notFind,
    {
        path: "/login",
        name: routerName.LOGIN,
        component: () => import("@/views/login.vue")
    }
];

export default new VueRouter({
    routes,
    mode: "hash"
});

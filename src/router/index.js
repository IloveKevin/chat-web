import Vue from "vue";
import VueRouter from "vue-router";
import notFind from "./not-find";
import routerName from "@/common/router-name";
import loginVerify from "./guard/login-verify";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: routerName.HOME
    },
    {
        path: "/login",
        name: routerName.LOGIN,
        component: () => import("@/views/login.vue"),
        meta: {
            title: "登录",
            needLogin: false
        }
    },
    {
        path: "/home",
        name: routerName.HOME,
        component: () => import("@/views/home.vue"),
        meta: {
            title: "首页",
            needLogin: true
        }
    },
    notFind,
];

const router = new VueRouter({
    routes,
    mode: "hash"
});

router.beforeEach(loginVerify);

export default router;

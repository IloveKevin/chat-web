import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import friend from "./friend";

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV != "production",
    modules: {
        user,
        friend
    }
});

export default store;
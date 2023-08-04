import { Notification } from "element-ui";
export const notice = function ({ title, message, type }) {
    Notification({
        title,
        message,
        type,
        duration: 3000
    });
};
export default {
    install(Vue) {
        Vue.prototype.$myNotice = notice;
    }
};
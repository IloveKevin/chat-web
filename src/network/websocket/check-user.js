import code from "@/common/code";
import routerName from "@/common/router-name";
import router from "@/router";
import store from "@/store";

export default ws => {
    ws.event.on(code.checkUserRequest.code, (message) => {
        if (message.state == code.checkUserRequest.state.fail || message.state == code.checkUserRequest.state.kick) {
            store.commit('REMOVE_TOKEN');
            return;
        }
        const { userName, token, refreshToken, userId } = message.data;
        if (router.currentRoute.name == routerName.LOGIN)
            router.push({ name: routerName.HOME });
        store.commit('SET_NAME', userName);
        store.commit('SET_ID', userId);
        if (token && refreshToken)
            store.commit('SET_TOKEN', { login: token, refresh: refreshToken });
        store.dispatch('GET_FRIEND_LIST');
        store.dispatch('GET_ADD_FRIEND_LIST');
    })
}
import code from "@/common/code";
import routerName from "@/common/router-name";
import router from "@/router";
import store from "@/store";

export default ws => {
    ws.event.on(code.checkUserRequest.code, (message) => {
        if (message.state === code.checkUserRequest.state.fail || message.state === code.checkUserRequest.state.kick) {
            store.commit('removeToken');
            return;
        }
        const { userName, token, refreshToken } = message.data;
        if (router.currentRoute.name === routerName.LOGIN)
            router.push({ name: routerName.HOME });
        store.commit('setName', userName);
        if (token && refreshToken)
            store.commit('setToken', { login: token, refresh: refreshToken });
        store.dispatch('getFriendList');
        store.dispatch('getAddFriendList');
    })
}
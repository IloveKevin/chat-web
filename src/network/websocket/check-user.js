import code from "@/common/code";
import routerName from "@/common/router-name";
import { setToken, removeToken } from "@/local";
import router from "@/router";

export default ws => {
    ws.event.on(code.checkUser.code, (message) => {
        if (message.state === code.checkUser.state.fail || message.state === code.checkUser.state.kick) {
            removeToken();
            return;
        }
        if (router.currentRoute.name === routerName.LOGIN)
            router.push({ name: routerName.HOME });
        if (message.state === code.checkUser.state.refresh) {
            let token = {
                login: message.data.token,
                refresh: message.data.refreshToken
            }
            setToken(token);
        }
    })
}
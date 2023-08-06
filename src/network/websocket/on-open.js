import store from "@/store";
import { checkUser } from "./we-send";

websocketInstance.event.on('open', () => {
    let token = store.state.user.token;
    websocketInstance.send({
        code: code.checkUserRequest.code,
        data: {
            token: token.login,
            refreshToken: token.refresh
        }
    })
});
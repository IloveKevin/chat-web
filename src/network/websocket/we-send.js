import code from "@/common/code";
import websocketInstance from ".";
import store from "@/store";

export function checkUser(callback) {
    let token = store.state.user.token;
    websocketInstance.send({
        code: code.checkUserRequest.code,
        data: {
            token: token.login,
            refreshToken: token.refresh
        }
    })
    websocketInstance.event.once(code.checkUserRequest.code, callback);
}
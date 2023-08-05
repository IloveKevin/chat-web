import code from "@/common/code";
import store from "@/store";

export default ws => {
    ws.event.on(code.newAddFriendRequest.code, (message) => {
        const { friendId, friendName } = message.data;
        store.commit('ADD_ADD_FRIEND', { id: friendId, nickname: friendName });
    })
}
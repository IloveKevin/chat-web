import code from "@/common/code";
import store from "@/store";
import { notice } from "@/plugs/notice";

export default (wss) => {
    wss.event.on(code.addFriendResponce.code, msg => {
        const { friendId, friendName, friendIsOnline } = msg.data;
        if (msg.state == code.addFriendResponce.state.success)
            return store.commit("ADD_FRIEND", { id: friendId, nickname: friendName, online: friendIsOnline });
        notice({
            title: "添加好友",
            message: `用户${friendName}拒绝了你的好友请求`,
            type: "warning"
        });
    });
}
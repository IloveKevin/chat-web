import code from "@/common/code";
import store from "@/store";
import { notice } from "@/plugs/notice";

export default (wss) => {
    wss.event.on(code.removeFriendResponce.code, msg => {
        const { friendId } = msg.data;
        let friend = store.state.friend.friendList.find(item => item.id == friendId);
        notice({
            title: "删除好友",
            message: `用户${friend.nickname}将你从好友列表中删除了`,
            type: "warning"
        });
        store.commit("REMOVE_FRIEND", friendId);
    });
}
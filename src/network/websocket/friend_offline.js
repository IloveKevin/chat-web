import code from "@/common/code";
import store from "@/store";
import { notice } from "@/plugs/notice.js";

export default function (wss) {
    wss.event.on(code.friendOfflineResponce.code, (msg) => {
        let friend = {
            id: msg.data,
            state: false
        }
        store.commit('UPDATE_FRIEND_ONLINE_STATE', friend);
        let nickname = store.state.friend.friendList.find((friend) => friend.id == msg.data).nickname;
        notice({
            title: '好友下线',
            message: `${nickname}下线了`,
            type: 'warning'
        })
    });
}
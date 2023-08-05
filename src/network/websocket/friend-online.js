import code from '../../common/code/index.js';
import store from '../../store/index.js';
import { notice } from '@/plugs/notice.js';
export default function (wss) {
    wss.event.on(code.feiendOnlineResponce.code, (msg) => {
        let friend = {
            id: msg.data,
            state: true
        }
        store.commit('UPDATE_FRIEND_ONLINE_STATE', friend);
        let nickname = store.state.friend.friendList.find((friend) => friend.id == msg.data).nickname;
        notice({
            title: '好友上线',
            message: `${nickname}上线了`,
            type: 'success'
        })
    });
}
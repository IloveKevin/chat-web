import websocketInstance from "@/network/websocket";
import code from "@/common/code";
const friend = {
    state: {
        friendList: [],//好友列表
        addFriendList: [],//添加好友列表
    },
    mutations: {
        //设置好友列表
        SET_FRIEND_LIST(state, friendList) {
            state.friendList = friendList;
        },

        //增加一个好友
        ADD_FRIEND(state, friend) {
            state.friendList.push(friend);
        },

        //删除一个好友
        REMOVE_FRIEND(state, friendId) {
            let index = state.friendList.findIndex(item => item.id == friendId);
            if (index != -1) {
                state.friendList.splice(index, 1);
            }
        },

        //设置添加好友列表
        SET_ADD_FRIEND_LIST(state, addFriendList) {
            state.addFriendList = addFriendList;
        },

        //增加一个添加好友
        ADD_ADD_FRIEND(state, addFriend) {
            state.addFriendList.push(addFriend);
        },

        //删除一个添加好友

        REMOVE_ADD_FRIEND(state, addFriendId) {
            let index = state.addFriendList.findIndex(item => item.id == addFriendId);
            if (index != -1) {
                state.addFriendList.splice(index, 1);
            }
        },

        //更新好友在线状态
        UPDATE_FRIEND_ONLINE_STATE(state, friend) {
            let index = state.friendList.findIndex(item => item.id == friend.id);
            if (index != -1) {
                state.friendList[index].online = friend.state;
            }
        },
    },
    actions: {
        //获取好友列表
        GET_FRIEND_LIST({ commit }) {
            websocketInstance.send({ code: code.getFriendListRequest.code });
            websocketInstance.event.once(code.getFriendListRequest.code, (data) => {
                commit('SET_FRIEND_LIST', data.data);
            });
        },

        //获取添加好友列表
        GET_ADD_FRIEND_LIST({ commit }) {
            websocketInstance.send({ code: code.getAddFriendListRequest.code });
            websocketInstance.event.once(code.getAddFriendListRequest.code, (data) => {
                commit('SET_ADD_FRIEND_LIST', data.data);
            }
            );
        },
    }
}

export default friend;
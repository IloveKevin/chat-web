import websocketInstance from "@/network/websocket";
import code from "@/common/code";
const friend = {
    state: {
        friendList: [],//好友列表
        addFriendList: [],//添加好友列表
    },
    mutations: {
        //设置好友列表
        setFriendList(state, friendList) {
            state.friendList = friendList;
        },

        //增加一个好友
        addFriend(state, friend) {
            state.friendList.push(friend);
        },

        //删除一个好友
        removeFriend(state, friendId) {
            state.friendList = state.friendList.filter(friend => friend.id !== friendId);
        },

        //设置添加好友列表
        setAddFriendList(state, addFriendList) {
            state.addFriendList = addFriendList;
        },

        //增加一个添加好友
        addAddFriend(state, addFriend) {
            state.addFriendList.push(addFriend);
        },

        //删除一个添加好友

        removeAddFriend(state, addFriendId) {
            state.addFriendList = state.addFriendList.filter(addFriend => addFriend.id !== addFriendId);
        },
    },
    actions: {
        //获取好友列表
        getFriendList({ commit }) {
            websocketInstance.send({ code: code.getFriendListRequest.code });
            websocketInstance.event.once(code.getFriendListRequest.code, (data) => {
                commit('setFriendList', data.data);
            });
        },

        //获取添加好友列表
        getAddFriendList({ commit }) {
            websocketInstance.send({ code: code.getAddFriendListRequest.code });
            websocketInstance.event.once(code.getAddFriendListRequest.code, (data) => {
                commit('setAddFriendList', data.data);
            }
            );
        },
    }
}

export default friend;
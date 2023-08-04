<template>
    <div class="my-home">
        <h1>你好{{ name }}</h1>
        <div>
            <div class="list-container">
                <h2>这里是好友列表</h2>
                <ul>
                    <li v-for="item in friends" :key="item.id">
                        {{ item.id }} | {{ item.nickname }} | {{ item.online ? '在线' : '离线' }}
                        <button @click="removeFriend(item.id)">删除</button>
                    </li>
                </ul>
            </div>
            <div class="list-container">
                <h2>这里是添加好友列表</h2>
                <ul>
                    <li v-for="item in addFriends" :key="item.id">
                        {{ item.id }} | {{ item.nickname }}
                        <button style="margin-right: 10px;" @click="handleAddFriend(item.id, 1)">同意</button>
                        <button @click="handleAddFriend(item.id, 0)">拒绝</button>
                    </li>
                </ul>
            </div>
        </div>
        <input type="text" placeholder="请输入要添加的用户id" v-model.number="addFriendId">
        <button @click="addFriend">添加</button>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import websocketInstance from '@/network/websocket';
import code from '@/common/code';
export default {
    name: 'my-home',
    components: {

    },
    mixins: [],
    props: {

    },
    data() {
        return {
            addFriendId: null,
        }
    },
    computed: {
        ...mapState({
            name: state => state.user.name,
            friends: state => state.friend.friendList,
            addFriends: state => state.friend.addFriendList,
        })
    },
    watch: {

    },
    mounted() {

    },
    methods: {
        addFriend() {
            if (!this.addFriendId) return;
            websocketInstance.send({
                code: code.addFriendRequest.code,
                data: {
                    friendId: this.addFriendId,
                }
            });
            websocketInstance.event.once(code.addFriendRequest.code, (data) => {
                let message;
                let type;
                switch (data.state) {
                    case code.addFriendRequest.state.success:
                        message = '请求添加好友成功'
                        type = 'success'
                        break;
                    case code.addFriendRequest.state.repeat:
                        message = '重复申请添加好友'
                        type = 'warning'
                        break;
                    case code.addFriendRequest.state.isFriend:
                        message = '对方已经是你的好友'
                        type = 'warning'
                        break;
                    case code.addFriendRequest.state.refuse:
                        message = '对方已经拒绝过你的好友申请'
                        type = 'warning'
                        break;
                }
                this.$myNotice({
                    title: '添加好友',
                    message,
                    type,
                });
            });
        },
        removeFriend(id) {
            websocketInstance.send({
                code: code.removeFriendRequest.code,
                data: {
                    friendId: id,
                }
            });
        },
        handleAddFriend(id, agree) {
            websocketInstance.send({
                code: code.handleAddFriendRequest.code,
                data: {
                    friendId: id,
                    agree,
                }
            });
        }
    }
};
</script>
<style scoped>
.my-home {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.list-container {
    display: inline-block;
    margin: 0 40px;
    vertical-align: top;
}
</style>
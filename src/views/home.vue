<template>
    <div class="my-home">
        <h1>你好{{ name }}</h1>
        <div>
            <div class="list-container">
                <h2>这里是在线好友列表</h2>
                <ul>
                    <li v-for="item in friends" :key="item.id">
                        {{ item.id }}
                    </li>
                </ul>
            </div>
            <div class="list-container">
                <h2>这里是添加好友列表</h2>
                <ul>
                    <li v-for="item in addFriends" :key="item.id">
                        {{ item.id }}
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
                code: code.addFriend.code,
                data: {
                    friendId: this.addFriendId,
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
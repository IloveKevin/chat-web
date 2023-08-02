<template>
    <div class="my-background my-flex">
        <div class="container" :class="{ 'is-register': !getIsLogin }">
            <div class="form-container login-container">
                <form action="#" class="my-flex" @submit.prevent="toLogin">
                    <h1>登录</h1>
                    <div>
                        <input type="text" v-model="loginData.username" required />
                        <label>请输入账号</label>
                    </div>
                    <div>
                        <input type="text" v-model="loginData.password" required />
                        <label>请输入密码</label>
                    </div>
                    <button type="submit">登录</button>
                </form>
            </div>
            <div class="form-container register-container">
                <form action="#" class="my-flex" @submit.prevent="toRegister">
                    <h1>注册</h1>
                    <div>
                        <input type="text" v-model="registerData.username" required>
                        <label>请输入用户名</label>
                    </div>
                    <div>
                        <input type="text" v-model="registerData.password" required>
                        <label>请输入密码</label>
                    </div>
                    <button>注册</button>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-panel-left my-flex">
                        <h1>欢迎注册</h1>
                        <button @click="isLogin = true">切换登录</button>
                    </div>
                    <div class="overlay-panel overlay-panel-right my-flex">
                        <h1>欢迎登陆{{ token }}</h1>
                        <button @click="isLogin = false">切换注册</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { login, register } from '../network/http';
import { mapState, mapMutations } from 'vuex';
import routerName from '@/common/router-name';
export default {
    name: 'login-1',
    components: {

    },
    mixins: [],
    props: {

    },
    data() {
        return {
            isLogin: true,
            loginData: {
                username: '',
                password: ''
            },
            registerData: {
                username: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapState({
            token: state => state.token
        }),
        getIsLogin() {
            return this.isLogin;
        }
    },
    watch: {

    },
    mounted() {

    },
    methods: {
        ...mapMutations(['setToken']),
        toLogin() {
            login({ account: this.loginData.username, password: this.loginData.password }).then(res => {
                const token = {
                    login: res.token,
                    refresh: res.refreshToken
                }
                this.setToken(token);
                this.$router.push({ name: routerName.HOME });
            });
        },
        toRegister() {
            register({ account: this.registerData.username, password: this.registerData.password }).then(res => {
                console.log(res);
            });
        }
    }
}
</script>
<style scoped>
.my-background {
    position: absolute;
    background-color: #fff;
    inset: 0;
}

.my-flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    min-height: 480px;
    width: 768px;
    max-width: 100%;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .2), 0 10px 10px rgba(0, 0, 0, .2);
}

.form-container {
    position: absolute;
    width: 50%;
    top: 0;
    height: 100%;
    transition: all .6s ease-in-out;
}

.form-container label {
    position: absolute;
    padding: 12px 15px;
    margin: 14px 0;
    left: 0;
    top: 0;
    pointer-events: none;
    transition: .5s;
}

.form-container form {
    background-color: #fff;
    flex-direction: column;
    padding: 0 50px;
    text-align: center;
    height: 100%;
}

.form-container input {
    background-color: #eee;
    border: none;
    margin: 20px 0;
    padding: 12px 15px;
    width: 100%;
}

.form-container button {
    background-color: #008ecf;
    border: none;
    margin-top: 20px;
    color: #fff;
    width: 50%;
    height: 40px;
    cursor: pointer;
    font-size: 18px;
    border-radius: 10px;
    transition: all .3s ease-in-out;
}

.form-container div {
    position: relative;
}

.form-container button:hover {
    background-color: #006f9e;
}

.form-container input:focus~label,
.form-container input:valid~label {
    top: -35px;
    left: 0;
    color: #008ecf;
    font-size: 12px;
}

.login-container {
    z-index: 1;
    opacity: 1
}

.register-container {
    z-index: 0;
    opacity: 0;
}

.overlay-container {
    position: absolute;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 2;
}

.overlay {
    position: absolute;
    width: 200%;
    height: 100%;
    left: -100%;
    transition: transform 0.6s ease-in-out;
    color: #fff;
    background: linear-gradient(to right, #008ecf, #008ecf) no-repeat 0 0 / cover;
}

.overlay button {
    background-color: #fff;
    border: none;
    margin-top: 20px;
    color: #008ecf;
    width: 50%;
    height: 40px;
    cursor: pointer;
    font-size: 18px;
    border-radius: 10px;
    transition: all .3s ease-in-out;
}

.overlay button:hover {
    box-shadow: 0 0 5px #03e9f4,
        0 0 25px #03e9f4,
        0 0 50px #03e9f4,
        0 0 100px #03e9f4;
}

.overlay-panel {
    position: absolute;
    flex-direction: column;
    width: 50%;
    height: 100%;
    transition: transform 0.6s ease-in-out;
}

.overlay-panel-left {
    transform: translateY(-20%);
}

.overlay-panel-right {
    right: 0;
}

.container.is-register .login-container {
    z-index: 0;
    opacity: 0;
    transform: translateY(100%);
}

.container.is-register .register-container {
    z-index: 1;
    opacity: 1;
    transform: translateX(100%);
}

.container.is-register .overlay-container {
    transform: translateX(-100%);
}

.container.is-register .overlay {
    transform: translateX(50%);
}

.container.is-register .overlay-panel-left {
    transform: translateY(0);
}

.container.is-register .overlay-panel-right {
    transform: translateY(20%);
}
</style>
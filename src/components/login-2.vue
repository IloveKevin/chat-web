<template>
    <div class="login-2">
        <div class="container">
            <h1>登录</h1>
            <div class="inputbox">
                <input type="text" required>
                <label>请输入账号</label>
            </div>
            <div class="inputbox">
                <input type="text" required>
                <label>请输入密码</label>
            </div>
            <a href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
            </a>
            <div class="test anim"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'login-2',
    components: {

    },
    mixins: [],
    props: {

    },
    data() {
        return {

        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {

    }
};
</script>
<style scoped>
.test {
    z-index: 2;
    position: fixed;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    width: 0rem;
    height: 0rem;
    border-radius: 100%;
    background-color: red;
}

.test.anim {
    animation: open 1.5s ease-in;
}

@keyframes open {
    0% {
        width: 0rem;
        height: 0rem;
        -webkit-clip-path: circle(0rem at center);
        clip-path: circle(0rem at center);
    }

    100% {
        width: 500vmax;
        height: 500vmax;
        -webkit-clip-path: circle(100% at center);
        clip-path: circle(100% at center);
    }
}

.login-2 {
    position: absolute;
    display: flex;
    inset: 0;
    background-color: black;
    justify-content: center;
    align-items: center;
}

.container {
    position: relative;
    background-color: rgb(129, 127, 255);
    width: 400px;
    height: 400px;
}

.container h1 {
    margin-top: 50px;
    text-align: center;
}

.inputbox {
    position: relative;
    margin: 0 auto;
}

.inputbox input {
    position: relative;
    outline: none;
    color: azure;
    border: none;
    border-bottom: 1px solid #fff;
    background: transparent;
    margin-bottom: 30px;
}

.inputbox label {
    position: absolute;
    pointer-events: none;
    color: #fff;
    left: 0;
    top: 0;
    transition: .5s;
}

.inputbox input:focus~label,
.inputbox input:valid~label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
}

.container a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px
}

.container a:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4,
        0 0 25px #03e9f4,
        0 0 50px #03e9f4,
        0 0 100px #03e9f4;
}

.container a span {
    position: absolute;
    display: block;
}

.container a span:nth-child(1) {
    top: 0;
    left: -100%;
    height: 2px;
    width: 100%;
    background: linear-gradient(90deg, transparent, rgb(168, 255, 127));
    animation: animate1 1s linear infinite;
}

@keyframes animate1 {
    0% {
        left: -100%;
    }

    50%,
    100% {
        left: 100%;
    }
}

.container a span:nth-child(2) {
    right: 0;
    top: 100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, rgb(168, 255, 127));
    animation: animate2 1s linear infinite;
    animation-delay: 0.25s;
}

@keyframes animate2 {
    0% {
        top: -100%;
    }

    50%,
    100% {
        top: 100%;
    }
}

.container a span:nth-child(3) {
    bottom: 0;
    right: -100%;
    height: 2px;
    width: 100%;
    background: linear-gradient(270deg, transparent, rgb(168, 255, 127));
    animation: animate3 1s linear infinite;
    animation-delay: 0.5s;
}

@keyframes animate3 {
    0% {
        right: -100%;
    }

    50%,
    100% {
        right: 100%;
    }
}

.container a span:nth-child(4) {
    left: 0;
    bottom: -100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, rgb(168, 255, 127));
    animation: animate4 1s linear infinite;
    animation-delay: 0.75s;
}

@keyframes animate4 {
    0% {
        bottom: -100%;
    }

    50%,
    100% {
        bottom: 100%;
    }
}
</style>
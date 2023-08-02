import eventListeners from "@/eventListeners/eventListeners";
import checkUser from "./check-user";
import { getToken, removeToken } from "@/local";
import code from "@/common/code";
import router from "@/router";
import routerName from "@/common/router-name";
import config from "@/config";

const websocketInstance = {
    state: 'close',
    ws: null,
    event: new eventListeners(),
    timer: null,
    heartTimeer: null,
    init() {
        console.log('连接websocket服务器');
        this.ws = new WebSocket(`ws://localhost:${config.webSocketServer.port}}`);
        this.ws.onopen = () => {
            this.state = 'open';
            this.event.emit('open');
            let token = getToken();
            this.send({
                code: code.checkUser.code,
                data: {
                    token: token.login,
                    refreshToken: token.refresh
                }
            })
        }
        this.ws.onmessage = (event) => {
            let data = JSON.parse(event.data);
            this.event.emit(data.code, data);
        }
        this.ws.onclose = (event) => {
            console.log('websocket服务器连接已关闭');
            clearTimeout(this.heartTimeer);
            this.state = 'close';
            this.event.emit('close');
            if (event.code === 1006 || event.code === 1011) {
                this.reconnect();
                return;
            }
            removeToken();
            if (router.currentRoute.name !== routerName.LOGIN)
                router.push({ name: routerName.LOGIN });
        }
        this.ws.onerror = () => {
            console.log('websocket服务器连接发生错误');
            clearTimeout(this.heartTimeer);
            this.state = 'error';
            this.event.emit('error');
            this.reconnect();
        }
        this.heartTimeer = setInterval(() => {
            this.heartPing();
        }, config.webSocketServer.heartTime);
    },
    send(data) {
        if (this.state === 'close') return;
        this.ws.send(JSON.stringify(data));
    },
    close() {
        this.ws.close();
        this.ws = null;
    },

    reconnect() {
        clearTimeout(this.timer);
        if (this.state !== 'open') {
            this.timer = setTimeout(() => {
                this.init();
            }, config.webSocketServer.reconnectTime);
        }
    },

    heartPing() {
        this.send({
            code: code.heartPing.code,
            data: 'hartPing'
        })
    }
}

checkUser(websocketInstance);

export default websocketInstance;
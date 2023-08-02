import heartPing from "./heart-ping";
import eventListeners from "@/eventListeners/eventListeners";
import checkUser from "./check-user";
import { getToken } from "@/local";
import code from "@/common/code";

const websocketInstance = {
    state: 'close',
    ws: null,
    event: new eventListeners(),
    timer: null,
    init() {
        this.ws = new WebSocket("ws://localhost:8080");
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
            this.state = 'close';
            this.event.emit('close');
            event.code === 1006 && this.reconnect();
        }
        this.ws.onerror = () => {
            this.state = 'error';
            this.event.emit('error');
            this.reconnect();
        }
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
            }, 5000);
        }
    }
}

heartPing(websocketInstance);

checkUser(websocketInstance);

export default websocketInstance;
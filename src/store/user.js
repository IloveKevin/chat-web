import { getToken, setToken, removeToken } from "@/local";
const User = {
    state: {
        name: '',
        token: {
            login: '',
            refresh: '',
        },
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            setToken(token);
        },
        removeToken(state) {
            state.token = {
                login: null,
                refresh: null,
            }
            removeToken();
        },
        setName(state, name) {
            state.name = name;
        },
    }
}

User.state.token = getToken();

export default User;
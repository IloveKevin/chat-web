import { getToken, setToken, removeToken } from "@/local";
const User = {
    state: {
        name: null,
        id: null,
        token: {
            login: null,
            refresh: null,
        },
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            setToken(token);
        },
        REMOVE_TOKEN(state) {
            state.token = {
                login: null,
                refresh: null,
            }
            removeToken();
        },
        SET_NAME(state, name) {
            state.name = name;
        },
        SET_ID(state, id) {
            state.id = id;
        }
    }
}

User.state.token = getToken();

export default User;
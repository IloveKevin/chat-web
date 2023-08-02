const item = {
    token: 'USER_TOKEN',
}

export function getToken() {
    let token = JSON.parse(localStorage.getItem(item.token));
    if (!token) token = {
        login: null,
        refresh: null,
    };
    return token;
}

export function setToken(token) {
    token = JSON.stringify(token);
    localStorage.setItem(item.token, token);
}

export function removeToken() {
    localStorage.removeItem(item.token);
}
import axios from "axios";

axios.defaults.withCredentials = true;

const request = axios.create({
    baseURL: "/api",
    timeout: 5000,
});

//错误处理函数
const errorHandler = (error) => {
    if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
    }
    console.log(error.config);
    return Promise.reject(error);
};

// 请求拦截器
request.interceptors.request.use(
    config => {
        return config;
    }, errorHandler);

// 响应拦截器
request.interceptors.response.use(
    response => {
        return response.data;
    }
    , errorHandler);

export const post = (url, data) => {
    return request.post(url, data);
}
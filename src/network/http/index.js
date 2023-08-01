import { post } from "@/util/request";

/**
 * 
 * @param {{account:string,password:string}} data 上行数据
 * @returns promise
 */
export const login = (data) => {
    return post("user/login", data);
}

/**
 * 
 * @param {{account:string,password:string}} data 上行数据
 * @returns promise
 */
export const register = (data) => {
    return post("user/register", data);
}
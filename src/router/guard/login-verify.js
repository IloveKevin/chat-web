import { getToken } from "@/local"
import routerName from "@/common/router-name"
const loginVerify = (to, from, next) => {
    let token = getToken()
    if (to.name === routerName.LOGIN && token.login) {
        next(routerName.HOME)
        return
    }
    if (to.meta.needLogin) {
        if (getToken().login) {
            next()
            return
        } else {
            next(routerName.LOGIN)
            return
        }
    }
    next()
}

export default loginVerify
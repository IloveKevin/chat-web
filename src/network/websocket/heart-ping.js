import code from "@/common/code"
export default ws => {
    ws.event.on(code.heartPing.code, () => {
        ws.send({
            code: code.heartPing,
            data: 'pong'
        })
    })
}
const WebSocket = require('ws')
const ws = new WebSocket.Server({
  port: 8080
})

ws.on('connection', ws => {
  console.log('ws 已经建立连接')
  // 接受小游戏发送的消息
  ws.on('message', message => {
    console.log('received: %s', message)
  })
})

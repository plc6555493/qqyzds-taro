import Taro from '@tarojs/taro'
const request = require('./request.js')
let socketurl = 'wss://socket.258m.com/'

function loadSocket(type, send_back) {
  //监听关闭socket
  Taro.onSocketClose(function() {})
  //监听错误事件
  Taro.onSocketError(function() {})
  //监听服务器消息
  Taro.onSocketMessage(function(event) {
    const msg = JSON.parse(event.data)
    console.log(msg)
    try {
      switch (msg.message_type) {
        case 'init':
          let options = { client_id: msg.client_id }
          request.request('bindClient', options, res => {
            //console.log(res);
          })
          break

        case 'chatMessage':
          break

        case 'offline':
          // 退出
          break

        case 'online':
          // 上线
          break

        case 'pong':
          // 相应ping
          break

        case 'push':
          //聊天内推送

          break

        case 'pushMessage':
          //聊天外推送
          send_back && send_back(msg)
          break
        default:
          console.error('未知消息类型')
          break
      }
    } catch (s) {
      console.error(s)
    }
  })
  //监听服务器消息
  Taro.onSocketOpen(res => {
    sendSocket(JSON.stringify({ type: 'init' }))
  })
  startSocket(type)
}

function startSocket(type) {
  let this_socketurl = socketurl
  if (type) {
    this_socketurl += type
  }
  Taro.connectSocket({
    url: this_socketurl,
    header: {
      'content-type': 'application/json'
    },
    method: 'GET',
    success: res => {
      //console.log(res);
    }
  })
}

function closeSocket() {
  Taro.closeSocket()
}

function sendSocket(msg) {
  Taro.sendSocketMessage({
    data: msg
  })
}

export { closeSocket, startSocket, loadSocket }

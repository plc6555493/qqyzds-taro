import Taro from '@tarojs/taro'
const request = require('../../utils/request.js')
const app = Taro.getApp()

function load(self) {
  request.isLogin(self)
  self.getauth_phone = getauth_phone
  self.close_login = close_login
  self.chang_tab = chang_tab
  self.login_submit = login_submit
  self.setData({ chang_tab: 1 })
}

function getauth_phone(e) {
  let self = this
  if (e.detail.encryptedData) {
    let session_key = request.getStorage('session_key')
    let openid = request.getStorage('openid')
    let detail = e.detail
    detail['session_key'] = session_key
    detail['openid'] = openid
    detail['from'] = 'store'
    request.request('hii/wxBindPhone', detail, res => {
      request.setStorage('token', res.data.token, 5)
      app.loadsocket()
      if (res.data.token) {
        self.setData({
          is_login: true
        })
      }
      self.onShow()
    })
  }
}

function close_login() {
  this.setData({ is_login: false })
}

function chang_tab(e) {
  let id = e.currentTarget.dataset.id
  this.setData({ chang_tab: id })
}

function login_submit(info) {
  let phone = info.detail.value.phone
  let password = info.detail.value.password
  if (phone == '' || password == '') {
    request.msg('请填写完整账号密码')
    return
  }

  request.request(
    'login',
    { username: phone, password: password, platform: 'platform' },
    res => {
      request.msg(res.msg)
      request.setStorage('token', res.data.token, 5)
      app.loadsocket()
      if (res.data.token) {
        this.setData({ is_login: true })
      }
      this.onShow()
    }
  )
}

module.exports = {
  load
}

import Taro from '@tarojs/taro'
// let url = "https://api.258m.net/";
let url = 'https://api.258m.com/'
let socketurl = 'wss://api.258m.com/'

/**
 *
 * @param this_url
 * @param data
 * @param fun
 * @param type
 * @param reservedFields 保留字段
 * @param needToken  是否需要token
 */
function request(this_url, data, fun, type, reservedFields, needToken = true) {
  if (!type) {
    type = 'post'
  }
  if (data == '') {
    data = {}
  }
  let get_url = url + this_url

  let token = getStorage('token')

  if (token != '' && needToken) {
    if (type != 'post') {
      get_url = get_url + '?token=' + token
    } else {
      data['token'] = token
    }
  }
  Taro.request({
    url: get_url,
    data: data,
    method: type,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    dataType: 'json',
    success: function(data) {
      if (data.data.msg == 'token invalid') {
        setStorage('token', '')
        let page = Taro.getCurrentPages()
        if (
          page[page.length - 1].route != 'pages/try/index' &&
          page[page.length - 1].route != 'pages/order/buy'
        ) {
          Taro.redirectTo({
            url: '/pages/public/login'
          })
        }
      }
      fun(data.data)
    }
  })
}

//设置缓存
//key 键值
//data  缓存数据
function setStorage(key, data, time) {
  var date = new Date()
  var time1 = date.getTime()
  if (time) {
    time = time1 + time * 60 * 1000 * 60
  } else {
    time = time1 + 7200000
  }
  var info = { data: data, over_time: time }
  Taro.setStorageSync(key, info)
}

//取缓存
//key 键值
function getStorage(key) {
  var info = Taro.getStorageSync(key)
  var date = new Date()
  var time1 = date.getTime()
  if (!info || time1 > info['over_time']) {
    return ''
  } else {
    return info['data']
  }
}

function msg(title, r = false) {
  Taro.showToast({
    title: title,
    icon: 'none',
    mask: true
  })
  if (r) {
    return false
  }
}

function loadding(title) {
  Taro.showLoading({
    title: title,
    mask: true
  })
}

function hideLoading() {
  Taro.hideLoading()
}

function startSocket(type) {
  Taro.connectSocket({
    url: socketurl + type,
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

function Modal(content, back, showCancel) {
  showCancel = showCancel ? true : false
  Taro.showModal({
    title: '提示',
    content: content,
    showCancel: showCancel,
    success(res) {
      back && back(res)
    }
  })
}

/**
 * 上传图片
 * */
function uploadImage(fun, type) {
  Taro.chooseImage({
    success(res) {
      const tempFilePaths = res.tempFilePaths
      let token = getStorage('token')

      Taro.uploadFile({
        url: 'https://api.258m.com/upload',
        filePath: tempFilePaths[0],

        name: 'file',
        formData: {
          typeUpload: type ? type : 'wx_album',
          token: token
        },
        success(res) {
          const data = res.data

          fun && fun(JSON.parse(data))
        },
        fail() {
          Taro.hideLoading()
        }
      })
    },
    fail() {
      Taro.hideLoading()
    }
  })
}

/**
 * 上传营业执照
 * @param fun
 * @param type
 */
function uploadBusinessLicense(fun, type) {
  Taro.chooseImage({
    success(res) {
      const tempFilePaths = res.tempFilePaths
      let token = getStorage('token')

      loadding('识别中...')

      Taro.uploadFile({
        url: 'https://api.258m.com/businessLicense',
        filePath: tempFilePaths[0],

        name: 'file',
        formData: {
          type: type ? type : 'file',
          token: token
        },

        success(res) {
          const data = res.data

          fun && fun(JSON.parse(data))
        },
        fail() {
          Taro.hideLoading()
        }
      })
    },
    fail() {
      Taro.hideLoading()
    }
  })
}

/**
 * 上传身份证
 * @param fun
 * @param type
 */
function uploadIdCard(fun, type) {
  Taro.chooseImage({
    success(res) {
      const tempFilePaths = res.tempFilePaths
      let token = getStorage('token')

      loadding('识别中...')

      Taro.uploadFile({
        url: 'https://api.258m.com/IdCard',
        filePath: tempFilePaths[0],

        name: 'file',
        formData: {
          type: type ? type : 'file',
          token: token
        },

        success(res) {
          const data = res.data

          fun && fun(JSON.parse(data))
        },
        fail() {
          Taro.hideLoading()
        }
      })
    },
    fail() {
      Taro.hideLoading()
    }
  })
}

/**
 * 上传临时素材
 * @param fun
 */
function uploadMediaTemp(fun, that) {
  Taro.chooseImage({
    success(res) {
      const tempFilePaths = res.tempFilePaths
      const media = tempFilePaths[0]

      console.log('media', media)

      let token = getStorage('token')

      loadding('上传中...')

      that.setData({ wx_min_head_img: media })

      Taro.uploadFile({
        url: 'https://api.258m.com/fastRegisterWeappUploadMediaTemp',
        filePath: tempFilePaths[0],
        name: 'media',
        formData: {
          type: 'media',
          media: media,
          token: token
        },

        success(res) {
          const data = res.data
          fun && fun(JSON.parse(data))
        },
        fail() {
          Taro.hideLoading()
        }
      })
    },
    fail() {
      Taro.hideLoading()
    }
  })
}

function loadPage(that) {
  var bg_color = getStorage('mainColor')
  var font_color = bg_color == '#ffffff' ? '#000000' : '#ffffff'
  that.setData({
    bg_color: bg_color,
    font_color: font_color,
    btnStyle:
      'background:' +
      bg_color +
      ';color:' +
      (bg_color == '#ffffff' ? '#666666' : '#ffffff')
  })
}

/**
 * 微信登录
 * @param app
 */
function wxLogin(app) {
  Taro.login({
    success: res => {
      request('hii/wxLogin', { code: res.code }, function(result) {
        setStorage('openid', result.data.openid)
        setStorage('session_key', result.data.session_key)
        if (result.data.token) {
          setStorage('token', result.data.token)
          var pages = Taro.getCurrentPages()
          var currentPage = pages[0]

          // console.log('pages',pages)
          // console.log('currentPage',currentPage)

          if (currentPage != undefined) {
            currentPage.setData({
              has_token: true
            })
            initApp(currentPage)
          }

          app.loadsocket()
        }
      })
    }
  })
}

/**
 * 初始化小程序
 */
function initApp(self) {
  let token = getStorage('token')

  if (token) {
    self.setData({ has_token: true })
    request(
      'initApp',
      {},
      res => {
        let {
          tplInit,
          wechat_user,
          wechat_set_pay,
          store_id,
          version = {}
        } = res.data

        setStorage('tplInit', tplInit)
        setStorage('wechat_user', wechat_user)
        setStorage('wechat_set_pay', wechat_set_pay)
        setStorage('version', version)
        // setStorage('store_id',res.data.store_id)
        // setStorage('store_name',res.data.store_name)

        let { product_list } = self.data

        if (tplInit && !wechat_user && store_id) {
          console.log('initApp tplInit && !wechat_user', res.data)

          let path = toStore(res.data.store_id, true, 'initApp')

          if (product_list) {
            product_list[0]['path'] = product_list[1]['path'] = path
          } else {
            product_list = []
          }

          console.log('path', path)

          self.setData({
            product_list: product_list
          })
        }

        self.setData(res.data)
      },
      '',
      ''
    )
  }
}

/**
 * 版本更新提示
 */
function getUpdateManager() {
  if (Taro.canIUse('getUpdateManager')) {
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate(function(res) {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function() {
          Taro.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function(res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function() {
          Taro.showModal({
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
          })
        })
      }
    })
  } else {
    Taro.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}

/**
 * 显示体验版本（h5）
 * @param store_id
 */
function toStore(store_id, returnUrl = false, from) {
  console.log('toStore:', store_id, 'from:', from)

  let token = getStorage('token')
  let tplInit = getStorage('tplInit')
  let wechat_user = getStorage('wechat_user')

  if (!store_id) {
    //店铺不存在，请确认
    Taro.navigateTo({ url: '/pages/try/index' })
  }

  if (tplInit && !wechat_user) {
    let url = 'https://min.258m.com/?sid=' + store_id
    url += '&token=' + token
    url += '&258m_open_box=1'
    url += '#/pages/index/vOne/index'
    url = '/pages/public/show_web?url=' + encodeURIComponent(url)
    console.log('url', url)
    if (returnUrl) {
      return url
    } else {
      Taro.navigateTo({ url: '/pages/try/index' })
    }
  }
}

function isLogin(self) {
  let token = getStorage('token')
  self.setData({
    is_login: !token ? false : true
  })
}

/**
 * 统一获取套餐
 * @param self
 */
function getGoodsListWxMinPackage(self, type) {
  Taro.getSystemInfo({
    success: function(res) {
      self.setData({
        windowHeight: res.windowHeight
      })
    }
  })

  request(
    'getGoodsListWxMinPackage',
    { type: type ? type : 'wholesaler' },
    function(res) {
      let goods = res.data.list
      let images = res.data.images
      for (var i in goods) {
        goods[i]['body_array'] = goods[i]['goods_body'].split(',')
        goods[i]['goods_jingle'] =
          goods[i]['goods_name'] +
          ',' +
          '最低至' +
          goods[i]['goods_average'] +
          '元'
      }

      self.setData({
        goods: goods,
        goods_images: images
      })
    }
  )
}

export {
  url,
  msg,
  request,
  getStorage,
  setStorage,
  loadding,
  hideLoading,
  Modal,
  uploadImage,
  uploadBusinessLicense,
  uploadIdCard,
  uploadMediaTemp,
  loadPage,
  getUpdateManager,
  wxLogin,
  initApp,
  toStore,
  isLogin,
  getGoodsListWxMinPackage
}

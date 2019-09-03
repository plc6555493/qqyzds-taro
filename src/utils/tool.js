import Taro from '@tarojs/taro'
const request = require('./request.js')

function wnwSetColor(that) {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[0]

  console.log('pages', pages)
  console.log('currentPage', currentPage)

  if (currentPage != undefined) {
    let mainColor = request.getStorage('mainColor')
    let btnStyle =
      'background:' +
      mainColor +
      ';color:' +
      (mainColor == '#ffffff' ? '#666666' : '#ffffff')

    that.setData({
      mainColor,
      btnStyle
    })
  }
}

function unicode2Ch(str) {
  if (!str) {
    return
  }
  // 控制循环跃迁
  var len = 1
  var result = ''
  // 注意，这里循环变量的变化是i=i+len 了
  for (var i = 0; i < str.length; i = i + len) {
    len = 1
    var temp = str.charAt(i)
    if (temp == '\\') {
      // 找到形如 \u 的字符序列
      if (str.charAt(i + 1) == 'u') {
        // 提取从i+2开始(包括)的 四个字符
        var unicode = str.substr(i + 2, 4)
        // 以16进制为基数解析unicode字符串，得到一个10进制的数字
        result += String.fromCharCode(parseInt(unicode, 16).toString(10))
        // 提取这个unicode经过了5个字符， 去掉这5次循环
        len = 6
      } else {
        result += temp
      }
    } else {
      result += temp
    }
  }
  return result
}

export { wnwSetColor, unicode2Ch }

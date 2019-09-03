import { Block, View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const request = require('../../../utils/request.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    bind_url: '',
    bind_url_mob: ''
  }

  componentWillMount(options = this.$router.params || {}) {
    let bind_url = decodeURIComponent(options.bind_url || '')
    let bind_url_mob = decodeURIComponent(options.bind_url_mob || '')
    this.setData({
      bind_url_mob: bind_url_mob,
      bind_url: bind_url
    })
  }

  copy = e => {
    let url = e.currentTarget.dataset.url
    Taro.setClipboardData({
      data: url,
      success: res => {
        request.msg('复制成功')
      }
    })
  }
  config = {
    navigationBarTitleText: '小程序授权'
  }

  render() {
    const { bind_url_mob: bind_url_mob } = this.state
    return (
      <View className="container">
        <View>
          <View className="url_contianer">
            <Text>{bind_url_mob}</Text>
          </View>
          <View className="tip">
            <Text>1.点击按钮复制链接</Text>
            <Text>2.使用微信浏览器打开链接</Text>
            <Text>3.按照提示授权小程序</Text>
          </View>
        </View>
        <Button onClick={this.copy} data-url={bind_url_mob}>
          复制授权链接
        </Button>
      </View>
    )
  }
}

export default _C

import { Block, WebView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './show_web.scss'

@withWeapp('Page')
class _C extends Taro.Component {
  state = {}
  componentWillMount = (options = this.$router.params || {}) => {
    this.setData({
      web_url: decodeURIComponent(options.url || '')
    })
  }
  componentDidMount = () => {}
  componentDidShow = () => {}
  componentDidHide = () => {}
  componentWillUnmount = () => {}
  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  config = {}

  render() {
    const { web_url: web_url } = this.state
    return <WebView src={web_url} />
  }
} // pages/public/show_web.js

export default _C

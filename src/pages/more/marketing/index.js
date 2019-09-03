import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const request = require('../../../utils/request.js')
const app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {}
  componentWillMount = () => {
    let that = this

    request.request('getPageMarketingInfo', '', res => {
      let list = res.data.list

      that.setData({
        image_list: list
      })
    })
  }
  componentDidShow = () => {}
  onShareAppMessage = () => {}
  config = {
    navigationBarTitleText: '营销小程序介绍页面'
  }

  render() {
    const { pic: pic, image_list: image_list } = this.state
    return image_list.map((item, index) => {
      return (
        <View className="big_tu">
          {image_list.length && (
            <Block>
              {image_list.map((item, index) => {
                return (
                  <View key={pic}>
                    <Image src={item.pic} style="width:100%;" mode="widthFix" />
                  </View>
                )
              })}
            </Block>
          )}
        </View>
      )
    })
  }
}

export default _C

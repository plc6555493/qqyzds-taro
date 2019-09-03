import { Block, Form, View, Input, Picker, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './edit.scss'
const request = require('../../utils/request.js')

let self = null

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    city: []
  }
  componentWillMount = (options = this.$router.params || {}) => {
    self = this
    request.request('hii/getStoreInfoManage', {}, res => {
      if (res.data) {
        self.setData({
          store_name: res.data.store_name,
          city:
            res.data.store_city != null ? res.data.store_city.split(',') : [],
          city_code:
            res.data.store_city_code != null
              ? res.data.store_city_code.split(',')
              : [],
          address: res.data.store_city_address,
          door_card: res.data.store_house_number,
          longitude: res.data.longitude,
          latitude: res.data.latitude
        })
      }
    })
  }
  componentDidMount = () => {}
  componentDidShow = () => {}
  componentDidHide = () => {}
  componentWillUnmount = () => {}
  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  onShareAppMessage = () => {}
  openlocation = () => {
    Taro.chooseLocation({
      success(res) {
        let latitude = res.latitude
        let longitude = res.longitude
        let address = res.address
        self.setData({
          latitude: latitude,
          longitude: longitude,
          address: address
        })
      }
    })
  }
  bindRegionChange = res => {
    self.setData({
      city_code: res.detail.code,
      city: res.detail.value
    })
  }
  formSubmit = res => {
    let data = res.detail.value
    data['store_city_code'] = self.data.city_code
    data['latitude'] = self.data.latitude
    data['longitude'] = self.data.longitude
    if (data['store_name'] == '') {
      request.msg('请输入店铺名称')
      return false
    }
    if (data['store_city'] == '' || data['store_city'].length < 2) {
      request.msg('请选择店铺所在地区')
      return false
    }
    if (data['store_address'] == '') {
      request.msg('请选择地址')
      return false
    }
    if (data['store_house_number'] == '') {
      request.msg('输入门牌号')
      return false
    }
    request.request(
      'hii/storeInfoUpdateManage',
      data,
      function(result) {
        request.msg(result.msg)
        if (result.state) {
          setTimeout(function() {
            Taro.navigateBack()
          }, 1000)
        }
      },
      '',
      true
    )
  }
  config = {
    navigationBarTitleText: '修改店铺信息'
  }

  render() {
    const {
      store_name: store_name,
      city: city,
      address: address,
      door_card: door_card
    } = this.state
    return (
      <Form onSubmit={this.formSubmit}>
        <View className="store_edit_info">
          <View className="store_one">
            <View className="store_left">店铺名称</View>
            <View className="store_right">
              <Input
                name="store_name"
                placeholder="请输入店铺名称"
                value={store_name}
              />
            </View>
            <View style="clear:both" />
          </View>
          <View className="store_one">
            <View className="store_left">所在区域</View>
            <View className="store_right">
              <Picker
                mode="region"
                onChange={this.bindRegionChange}
                name="store_city"
                value={city}
              >
                {city && city.length > 1 ? (
                  <View className="picker">
                    {city[0] + ' ' + city[1] + ' ' + city[2]}
                  </View>
                ) : (
                  <View className="picker">请选择所在区域</View>
                )}
              </Picker>
            </View>
            <View style="clear:both" />
          </View>
          <View className="store_one">
            <View className="store_left">地址信息</View>
            <View className="store_right" onClick={this.openlocation}>
              <Input
                type="text"
                disabled
                name="store_city_address"
                placeholder="请选择地址信息"
                value={address}
              />
            </View>
            <View style="clear:both" />
          </View>
          <View className="store_one">
            <View className="store_left">门牌号</View>
            <View className="store_right">
              <Input
                type="text"
                name="store_house_number"
                value={door_card ? door_card : ''}
                placeholder="请输入门牌号"
              />
            </View>
            <View style="clear:both" />
          </View>
        </View>
        <View className="submit_button">
          <Button formType="submit">提交修改</Button>
        </View>
      </Form>
    )
  }
}

export default _C

import { Block, View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const request = require('../../../../utils/request.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    appid: '',
    loading: true,
    categories: [],
    limit: 0,
    category_limit: 0,
    quota: 0
  }

  componentWillMount(options = this.$router.params || {}) {
    let appid = options.appid || ''
    this.setData({ appid: appid, loading: true })

    request.loadding('加载中')
    request.request('fastRegisterWeappGetCategory', {}, res => {
      request.hideLoading()

      let data = res.data || {}
      let categories = (data.categories || []).map(item => {
        switch (item.audit_status) {
          case 1:
            item.audit_text = '审核中'
            item.audit_color = '#999'
            break
          case 2:
            item.audit_text = '审核不通过'
            item.audit_color = '#ff0000'
            break
          case 3:
            item.audit_text = '审核通过'
            item.audit_color = 'yellowgreen'
            break
          default:
            item.audit_text = ''
            item.audit_color = '#999'
            break
        }
      })

      this.setData({
        categories: categories,
        limit: data.limit || 0,
        category_limit: data.category_limit || 0,
        quota: data.quota || 0,
        loading: false
      })
    })
  }

  addCategory = () => {
    const {} = this.data
  }
  config = {
    navigationBarTitleText: '服务类目'
  }

  render() {
    const {
      limit: limit,
      quota: quota,
      category_limit: category_limit,
      loading: loading,
      categories: categories
    } = this.state
    return (
      !loading && (
        <View className="container">
          {categories.map((item, index) => {
            return (
              <View>
                <View className="item">
                  <Text className="item_top">{'类目 ' + (index + 1)}</Text>
                  <View className="item_bottom">
                    <Text>{item.first_name + ' - ' + item.second_name}</Text>
                    <Text style={'color: ' + item.audit_color + ';'}>
                      {item.audit_text}
                    </Text>
                  </View>
                </View>
              </View>
            )
          })}
          <View className="tip">
            <Text className="tip_title_bottom tip_title_main">提示:</Text>
            <Text className="tip_title_bottom tip_title_main">
              {'1.本月可以设置类目的次数 ' + limit + ' 次'}
            </Text>
            <Text className="tip_title_bottom tip_title_main">
              {'2.本月还可以设置类目的次数 ' + quota + ' 次'}
            </Text>
            <Text className="tip_title_bottom tip_title_main">
              {'3.小程序最多可以设置的类目数量 ' + category_limit + ' 个'}
            </Text>
          </View>
          <Button disabled={quota == 0} onClick={this.addCategory}>
            添加
          </Button>
        </View>
      )
    )
  }
}

export default _C

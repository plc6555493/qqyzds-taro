import { Block, View, RadioGroup, Image, Radio, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const request = require('../../utils/request.js')
const tool = require('../../utils/tool.js')
const app = Taro.getApp()

let self = null

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    tpl_list: []
  }
  componentWillMount = () => {
    self = this

    tool.wnwSetColor(self)

    let tplInit = request.getStorage('tplInit')
    let store_id = request.getStorage('store_id')

    // 未选择模板 提示显示模板
    if (!tplInit) {
      request.request('getWxMinTplList', '', res => {
        if (res.data) {
          let { list } = res.data
          var select_id = ''
          for (var i in list) {
            if (list[i]['checked']) {
              select_id = list[i]['id']
              break
            }
          }
          self.setData({
            tpl_list: list,
            select_id: select_id,
            inited: true
          })
        }
      })
    } else {
      self.toStore(store_id)
    }
  }
  componentDidShow = () => {
    console.log(
      '模板列表页面=>选择模板=>授权（未授权时）=>生成网页版，并可跳转预览'
    )
  }
  onShareAppMessage = () => {}
  picClick = e => {
    var list = self.data.tpl_list

    var pic_list = []
    for (var i in list) {
      pic_list.push(list[i]['picture'])
    }
    var pic = e.currentTarget.dataset.pic
    Taro.previewImage({
      current: pic,
      urls: pic_list
    })
  }
  changeRadio = e => {
    self.setData({ select_id: e.detail.value })
  }
  chooseTpl = e => {
    let { select_id } = self.data

    if (select_id == '') {
      return request.msg('请选择一套模板后提交', true)
    }

    request.request('setWxMinTpl', { id: select_id }, res => {
      if (res.state) {
        let store_id = res.data.store_id
        request.setStorage('tplInit', true)
        request.setStorage('store_id', store_id)
        Taro.showModal({
          title: '选择模板成功',
          content: '立即前往体验？',
          showCancel: true,
          success: res => {
            if (res.confirm) {
              self.toStore(store_id)
            }
          }
        })
      }
    })
  }
  toStore = store_id => {
    request.toStore(store_id)
  }
  config = {
    navigationBarTitleText: '选择模板'
  }

  render() {
    const {
      i: i,
      tpl_list: tpl_list,
      select_id: select_id,
      btnStyle: btnStyle,
      inited: inited
    } = this.state
    return (
      <Block>
        {inited ? (
          <Block>
            <View className="tpl_list">
              <RadioGroup name="style_id" onChange={this.changeRadio}>
                {tpl_list.map((item, val) => {
                  return (
                    <View className="tpl_list_one" key={i}>
                      <Image
                        src={item.picture}
                        onClick={this.picClick}
                        data-pic={item.picture}
                      />
                      <View>
                        <Block>
                          {select_id == item.id ? (
                            <Block>
                              <Radio checked={true} value={item.id} />
                            </Block>
                          ) : (
                            <Block>
                              <Radio value={item.id} />
                            </Block>
                          )}
                        </Block>
                        {item.name}
                      </View>
                    </View>
                  )
                })}
              </RadioGroup>
              <View style="clear:both" />
              <View
                className="submit"
                onClick={this.chooseTpl}
                style={btnStyle}
              >
                保存
              </View>
            </View>
          </Block>
        ) : (
          <Block>
            <View className="text center">
              <Text>加载中...</Text>
            </View>
          </Block>
        )}
      </Block>
    )
  }
}

export default _C

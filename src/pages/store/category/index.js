import {
  Block,
  View,
  Label,
  Button,
  Form,
  Picker,
  RadioGroup,
  Radio,
  Image,
  Text
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const request = require('../../../utils/request.js')
const obj = require('../../../utils/obj.js')

let self = null

// id	类目ID
// name	类目名称
// level	类目层级
// father	类目父级ID
// children	子级类目ID
// sensitive_type	是否为敏感类目（1为敏感类目，需要提供相应资质审核；0为非敏感类目，无需审核）
// qualify.exter_list.inner_list.name	Sensitive_type为1的类目需要提供的资质文件名称
// qualify.exter_list.inner_list.url	资质文件示例

let initData = {
  multiArray: [],
  multiIndex: [0, 0],
  first: '',
  second: '',
  sensitive_type: false,
  exter_list: [],
  addFlag: false,
  show_tips: true,
  show_tips_limit: true,
  inited: false,
  qualifications: []
}

@withWeapp('Page')
class _C extends Taro.Component {
  state = initData
  componentWillMount = (options = this.$router.params || {}) => {
    self = this

    //所有类目
    //     190405 快速注册支持的类目，目前13个，以 https://docs.qq.com/sheet/DQnJZa05GaFVFTW1U?tab=BB08J2 为准
    //     快递业与邮政
    //     教育
    //     医疗
    //     出行与交通
    //     房地产
    //     生活服务
    //     餐饮
    //     旅游
    //     商家自营
    //     商业服务
    //     公益
    //     体育
    //     汽车
    request.request(
      'fastRegisterWeappGetAllCategories',
      { fasterRegister: 1 },
      res => {
        if (res.data) {
          let classList = res.data
          let multiArray = []
          let levelOneFilter = []
          let levelTwoFilter = []

          let levelOne = obj.filter(classList, item => item.level == '1')
          let levelTwo = obj.filter(classList, item => item.level == '2')

          obj.map(levelOne, (item, key) => {
            let data = {}
            data['id'] = item.id
            data['father'] = item.father
            data['name'] = item.name
            levelOneFilter.push(item)
          })

          obj.map(levelTwo, (item, key) => {
            let data = {}
            if (item.father == 1) {
              data['id'] = item.id
              data['father'] = item.father
              data['name'] = item.name
              levelTwoFilter.push(item)
            }
          })

          multiArray.push(levelOneFilter, levelTwoFilter)

          self.setData({
            classList: classList,
            multiArray: multiArray,
            levelOneFilter: levelOneFilter,
            levelTwoFilter: levelTwoFilter
          })
        }
      }
    )
  }
  componentDidShow = () => {
    //已设置的类目
    request.request('fastRegisterWeappGetCategory', {}, res => {
      if (res.data) {
        let {
          categories: classListSet,
          limit,
          category_limit,
          quota
        } = res.data

        self.setData({
          classListSet: classListSet,
          limit: limit,
          category_limit: category_limit,
          quota: quota,
          inited: true
        })
      }
    })
  }
  showpic = res => {
    console.log(res.currentTarget.dataset.pic)
    Taro.previewImage({
      urls: [res.currentTarget.dataset.pic]
    })
  }
  radioChange = e => {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    self.setData({ exter_checked: e.detail.value })
  }
  bindMultiPickerChange = e => {
    self.quotaVerfiy()

    const { multiArray } = self.data
    let multiIndex = e.detail.value
    let firstValue = multiIndex[0]
    let secondValue = multiIndex[1]
    let firstArray = multiArray[0]
    let secondArray = multiArray[1]

    console.log('picker发送选择改变，携带值为', multiIndex)

    let sensitive_type =
      secondArray.length > 0 ? secondArray[secondValue].sensitive_type : false

    let exter_list =
      sensitive_type && secondArray.length > 0
        ? secondArray[secondValue].qualify.exter_list
        : []

    self.setData({
      multiIndex: multiIndex,
      first: firstArray[firstValue].id,
      //firstName: firstArray[firstValue].name,
      second: secondArray.length > 0 ? secondArray[secondValue].id : '',
      sensitive_type: sensitive_type,
      exter_list: exter_list,
      exter_checked: exter_list.length > 0 ? 0 : ''
      //secondName: secondArray[secondValue].name,
    })
  }
  bindMultiPickerColumnChange = e => {
    self.quotaVerfiy()

    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);

    let data = {}
    let { levelOneFilter, multiIndex, multiArray, classList } = self.data
    data.multiIndex = multiIndex
    data.multiIndex[e.detail.column] = e.detail.value

    switch (e.detail.column) {
      case 0:
        let levelTwoFilter = []
        let father = levelOneFilter[e.detail.value]['id']
        console.log('father', father)
        obj.map(classList, (item, key) => {
          let data = {}
          if (item.father == father) {
            data['id'] = item.id
            data['father'] = item.father
            data['name'] = item.name
            levelTwoFilter.push(item)
          }
        })

        data.multiArray = multiArray
        data.multiArray[1] = levelTwoFilter
        data.second = ''
        break
    }

    self.setData(data)
  }
  formSubmit = res => {
    self.quotaVerfiy()

    //阻止提交
    let preventSubmission = false

    let data = res.detail.value
    let dataPage = self.data
    console.log('data formSubmit', data)
    console.log('data page', dataPage)

    let { first, second, sensitive_type, qualifications } = dataPage

    // key:《食品经营许可证》
    // value:4MeaNOZzO2Kh87WC8w0rsFPVlAvRTEvnJQW50TETsnzoC1hHMYa7MHl_n3xy0AKC
    // first:304
    // second:321
    if (first) {
      data.first = first
    } else {
      request.msg('请选择一级分类')
      return false
    }
    if (second) {
      data.second = second
    } else {
      request.msg('请选择二级分类')
      return false
    }

    //sensitive_type 1为敏感类目  需要上传 key and value
    if (sensitive_type && qualifications.length < 1) {
      return request.msg('请上传相关资质证明', true)
    } else {
      let { exter_list, exter_checked } = self.data

      let item_inner_item = exter_list[exter_checked] || {}

      ;(item_inner_item['inner_list'] || []).map((item, index) => {
        console.log(item, index)
        if (item.media == undefined) {
          preventSubmission = true
          return request.msg('请上传 "' + item.name + '" 的资质资料', true)
        }
      })

      let qualificationsStr = JSON.stringify(qualifications)
      data.qualifications = qualificationsStr
    }

    console.log(data)

    if (!preventSubmission) {
      request.request(
        'fastRegisterWeappAddCategory',
        data,
        function(result) {
          if (result.state) {
            if (sensitive_type) {
              request.msg('提交成功，请等待审核')
            } else {
              request.msg(result.msg)
            }

            setTimeout(function() {
              self.setData(initData)
              self.onShow()
            }, 1000)
          } else {
            request.msg(result.msg)
          }
        },
        '',
        true
      )
    }
  }
  addToggle = () => {
    let addFlag = self.data.addFlag
    self.setData({ addFlag: !addFlag })
  }
  closeTips = () => {
    self.setData({ show_tips: false })
  }
  closeTipsLimit = () => {
    self.setData({ show_tips_limit: false })
  }
  quotaVerfiy = () => {
    let { quota } = self.data
    console.log('quotaVerfiy quota: ', quota)
    if (quota == 0) {
      return request.msg('本月还可以设置类目的次数不足，不可操作', true)
    }
  }
  catTextObj = e => {
    let { item_inner_item } = e.target.dataset
    let name = ''
    item_inner_item.map(i => {
      name += i.name + '及'
    })
    name = name.substr(0, name.length - 1)
    console.log('name', name)
    self.showName(name)
  }
  catText = e => {
    console.log('catText', e.target.dataset)
    let { name } = e.target.dataset
    self.showName(name)
  }
  showName = name => {
    Taro.showModal({
      title: '资质文件全部文字',
      content: name,
      showCancel: false,
      success: res => {}
    })
  }
  uploadQualifications = e => {
    Taro.showActionSheet({
      //todo 相机拍摄
      itemList: ['本地上传'],
      success: r => {
        console.log(e)

        if (r.tapIndex == 0) {
          request.uploadMediaTemp(res => {
            let { name, id } = e.currentTarget.dataset
            let { qualifications, exter_list, exter_checked } = self.data
            let key = exter_list[exter_checked][name][id]['name']
            exter_list[exter_checked][name][id]['media'] =
              self.data.wx_min_head_img

            request.msg(res.msg)

            if (res.state) {
              qualifications.push({
                key: key,
                value: res.data.media_id
              })

              self.setData({ qualifications, exter_list })
            }
          }, self)
        } else {
        }
      }
    })
  }
  config = {
    navigationBarTitleText: '服务类目'
  }

  render() {
    const {
      classListSet: classListSet,
      addFlag: addFlag,
      limit: limit,
      quota: quota,
      category_limit: category_limit,
      show_tips_limit: show_tips_limit,
      multiIndex: multiIndex,
      multiArray: multiArray,
      second: second,
      first: first,
      exter_list: exter_list,
      json: json,
      exter_checked: exter_checked,
      sensitive_type: sensitive_type,
      undefined: undefined,
      show_tips: show_tips,
      inited: inited
    } = this.state
    return inited ? (
      <Block>
        {classListSet.length > 0 && !addFlag ? (
          <Block>
            {classListSet.map((item, index) => {
              return (
                <View key="i">
                  <View className="store_edit_info">
                    <View className="store_one">
                      <View className="store_left">
                        {'服务类目 ' + (index + 1)}
                      </View>
                      <View className="store_right">
                        <View>
                          <Label className="service_name">
                            {item.first_name + ' > ' + item.second_name}
                          </Label>
                          <Label className="service_status">
                            状态
                            {item.audit_status == 1 && (
                              <Label className="chartreuse">审核中</Label>
                            )}
                            {item.audit_status == 2 && (
                              <Label className="grey">审核不通过</Label>
                            )}
                            {item.audit_status == 3 && (
                              <Label className="yellowgreen">审核通过</Label>
                            )}
                          </Label>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })}
            {/* 重复的结构1开始 */}
            <View className="submit_button">
              {show_tips_limit && (
                <View
                  className="tips_info_bottom"
                  onClick={this.closeTipsLimit}
                >
                  <View className="tip_title_bottom tip_title_main">
                    提示：
                  </View>
                  <View className="tip_desc_bottom">
                    {'1.本月可以设置类目的次数 ' + limit + ' 次'}
                  </View>
                  <View className="tip_desc_bottom">
                    {'2.本月还可以设置类目的次数 ' + quota + ' 次'}
                  </View>
                  <View className="tip_desc_bottom">
                    {'3.小程序最多可以设置的类目数量 ' + category_limit + ' 个'}
                  </View>
                  {quota == 0 && (
                    <View className="tip_desc_bottom">
                      4.本月无可设置类目的次数，不可添加
                    </View>
                  )}
                </View>
              )}
            </View>
            {/* 重复的结构1结束 */}
            <View onClick={this.addToggle} className="submit_button">
              <Button disabled={quota == 0}>点击添加</Button>
            </View>
          </Block>
        ) : (
          <Block>
            <Form onSubmit={this.formSubmit}>
              <View className="store_edit_info">
                <View className="store_one">
                  <View className="store_left">选择服务类目</View>
                  <View className="store_right">
                    <Picker
                      mode="multiSelector"
                      onChange={this.bindMultiPickerChange}
                      onColumnChange={this.bindMultiPickerColumnChange}
                      value={multiIndex}
                      range={multiArray}
                      rangeKey="name"
                    >
                      {first ? (
                        <View className="picker">
                          {multiArray[0][multiIndex[0]]['name'] +
                            ' ' +
                            (second ? '>' : '') +
                            '\n                                ' +
                            multiArray[1][multiIndex[1]]['name']}
                        </View>
                      ) : (
                        <View className="picker">
                          请根据小程序自身的功能，正确选择服务类目
                        </View>
                      )}
                    </Picker>
                  </View>
                  <View style="clear:both" />
                </View>
                {/* 选择上传资质 */}
                {first && second && (
                  <Block>
                    {exter_list.length > 0 ? (
                      <Block>
                        <View className="store_one">
                          <View className="store_left">
                            选择上传资质
                            {exter_list.length > 1 && (
                              <View className="choose_tips">
                                {'(' + exter_list.length + '选1即可)'}
                              </View>
                            )}
                          </View>
                          <View className="store_right">
                            {sensitive_type == 1 && (
                              <View>
                                {exter_list.map((item_exter, idx) => {
                                  return (
                                    <Block key="idx">
                                      {item_exter.map(
                                        (item_inner_item, idy) => {
                                          return (
                                            <Block key="idy">
                                              <View>
                                                <RadioGroup
                                                  className="radio-group"
                                                  onChange={this.radioChange}
                                                >
                                                  <Label
                                                    className="radio"
                                                    data-a1={idx}
                                                    data-a2={idx}
                                                    data-a3={json.stringify(
                                                      item_exter
                                                    )}
                                                    data-a4={item_inner_item}
                                                  >
                                                    <Radio
                                                      value={idx}
                                                      name="exter_item"
                                                      checked={
                                                        idx == exter_checked
                                                      }
                                                    />
                                                  </Label>
                                                </RadioGroup>
                                                <View className="store_left_upload_item">
                                                  <View
                                                    onClick={this.catTextObj}
                                                    data-item_inner_item={
                                                      item_inner_item
                                                    }
                                                    className="exter_name_all nowrap_ellipsis"
                                                  >
                                                    {item_inner_item.map(
                                                      (item_final, iz) => {
                                                        return (
                                                          <Block key="idz">
                                                            {item_final.name}
                                                          </Block>
                                                        )
                                                      }
                                                    )}
                                                  </View>
                                                  <View style="clear: both" />
                                                </View>
                                              </View>
                                            </Block>
                                          )
                                        }
                                      )}
                                    </Block>
                                  )
                                })}
                              </View>
                            )}
                          </View>
                          <View style="clear:both" />
                        </View>
                        {/* 上传部分 */}
                        {first && second && (
                          <Block>
                            <View className="store_one">
                              {sensitive_type == 1 && (
                                <View>
                                  <View>
                                    {exter_list[exter_checked].map(
                                      (item_inner_item, idy) => {
                                        return (
                                          <Block key="idy">
                                            {item_inner_item.map(
                                              (item_final, idz) => {
                                                return (
                                                  <Block key="idz">
                                                    <View className="store_left_upload_item">
                                                      <View
                                                        className="exter_name nowrap_ellipsis"
                                                        onClick={this.catText}
                                                        data-name={
                                                          item_final.name
                                                        }
                                                      >
                                                        {item_final.name}
                                                      </View>
                                                      {item_final.url != '' && (
                                                        <View
                                                          className="exter_url"
                                                          data-pic={
                                                            item_final.url
                                                          }
                                                          onClick={this.showpic}
                                                        >
                                                          （查看示例）
                                                        </View>
                                                      )}
                                                      <View className="store_left_upload">
                                                        {item_final.media !=
                                                          undefined && (
                                                          <Image
                                                            src={
                                                              item_final.media
                                                            }
                                                            className="final_media"
                                                          />
                                                        )}
                                                        <View
                                                          style="padding-right: 8px;"
                                                          onClick={
                                                            this
                                                              .uploadQualifications
                                                          }
                                                          className="picker_to_upload"
                                                          data-id={idz}
                                                          data-name={idy}
                                                        >
                                                          {item_final.media
                                                            ? '重新上传'
                                                            : '点此上传'}
                                                          <Image
                                                            src={require('../../../image/turn_right.png')}
                                                            className="picker_turn"
                                                          />
                                                        </View>
                                                      </View>
                                                    </View>
                                                    <View style="clear: both" />
                                                  </Block>
                                                )
                                              }
                                            )}
                                          </Block>
                                        )
                                      }
                                    )}
                                  </View>
                                </View>
                              )}
                              <View style="clear:both" />
                            </View>
                          </Block>
                        )}
                      </Block>
                    ) : (
                      <Block>
                        <View className="store_one">
                          <View className="store_left_whole">
                            提示：当前服务类目无须上传资质
                          </View>
                          <View style="clear:both" />
                        </View>
                      </Block>
                    )}
                  </Block>
                )}
              </View>
              <View className="submit_button">
                {sensitive_type != 0 && (
                  <Block>
                    {show_tips && first && second ? (
                      <View className="tips_info" onClick={this.closeTips}>
                        <View className="tips_close">x</View>
                        <View className="tip_title">提示：</View>
                        <View className="tip_desc">
                          1.点击名称文字可查看全部
                        </View>
                        <View className="tip_desc">
                          2.点击查看示例可查看样例
                        </View>
                        <View className="tip_desc">
                          3.上传原件或复印件，复印件务必加盖公司公章
                          文件格式为jpg、jpeg、bmp、gif或png，文件大小不超过5M。
                        </View>
                      </View>
                    ) : (
                      !first &&
                      !second && (
                        <View className="tips_info_bottom">
                          <View className="tip_title_bottom tip_title_main">
                            提示：
                          </View>
                          <View className="tip_desc_bottom">
                            1.点击名称文字可查看全部
                          </View>
                          <View className="tip_desc_bottom">
                            2.点击查看示例可查看样例
                          </View>
                          <View className="tip_desc_bottom">
                            3.上传原件或复印件，复印件务必加盖公司公章
                            文件格式为jpg、jpeg、bmp、gif或png，文件大小不超过5M。
                          </View>
                        </View>
                      )
                    )}
                  </Block>
                )}
                {show_tips_limit && (
                  <View className="tips_info" onClick={this.closeTipsLimit}>
                    <View className="tips_close">x</View>
                    <View className="tip_title">提示：</View>
                    <View className="tip_desc">
                      {'1.本月可以设置类目的次数 ' + limit + ' 次'}
                    </View>
                    <View className="tip_desc">
                      {'2.本月还可以设置类目的次数 ' + quota + ' 次'}
                    </View>
                    <View className="tip_desc">
                      {'3.小程序最多可以设置的类目数量 ' +
                        category_limit +
                        ' 个'}
                    </View>
                    {quota == 0 && (
                      <View className="tip_desc">
                        4.本月无可设置类目的次数，不可添加
                      </View>
                    )}
                  </View>
                )}
                <Button onClick={this.addToggle} className="add_toggle_cancel">
                  取消
                </Button>
                <Button formType="submit" disabled={quota == 0}>
                  保存
                </Button>
              </View>
            </Form>
          </Block>
        )}
      </Block>
    ) : (
      <Block>
        <View className="text center">
          <Text>加载中... 请稍后</Text>
        </View>
      </Block>
    )
  }
}

export default _C

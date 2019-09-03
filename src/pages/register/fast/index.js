import {
  Block,
  Form,
  View,
  Image,
  Picker,
  Input,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const request = require('../../../utils/request.js')

let self = null

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    error_msg: '法人姓名和身份证姓名信息不一致,请仔细确认后手动修改',
    type_array: ['请选择', '企业', '个体工商户'],
    type_index: 0,
    company_name: '',
    company_code: '',
    name: '',
    legal_persona_wechat: '',
    uploadTitle: '点此上传',
    uploadTitleIdCard: '点此上传',
    idCardNum: '',
    realName: '',
    workNumber: '' //推荐人编号
  }
  componentWillMount = (options = this.$router.params || {}) => {
    request.loadPage(this)
  }
  componentDidMount = () => {}
  componentDidShow = () => {
    self = this
  }
  componentDidHide = () => {}
  componentWillUnmount = () => {}
  onPullDownRefresh = () => {}
  onReachBottom = () => {}
  onShareAppMessage = () => {}
  formSubmit = res => {
    let detail = res.detail.value
    var error_msg = self.data.error_msg

    if (
      detail.company_name == '' ||
      detail.company_code == '' ||
      detail.name == ''
    ) {
      request.msg('请填写主体信息或上传营业执照')
      return false
    }

    if (detail.realName == '' || detail.person_sn == '') {
      request.msg('请填写管理员信息或上传身份证')
      return false
    }

    if (detail.name != detail.realName) {
      request.Modal(error_msg)
      return false
    }

    if (detail.legal_persona_wechat == '') {
      request.msg('请填写微信号')
      return false
    }

    if (!detail.type_company) {
      request.msg('请选择企业类型')
      return false
    }

    let data = {
      name: detail.company_name,
      code: detail.company_code,
      legal_persona_wechat: detail.legal_persona_wechat,
      legal_persona_name: detail.name,
      workNumber: detail.workNumber || ''
    }

    request.request('fastRegisterWeappCreate', data, res => {
      request.msg(res.msg)
    })
  }
  change_picker = e => {
    self.setData({
      type_index: e.detail.value
    })
  }
  uploadBusinessLicense = () => {
    Taro.showActionSheet({
      //todo 相机拍摄
      itemList: ['本地上传'],
      success: res => {
        if (res.tapIndex == 0) {
          request.uploadBusinessLicense(res => {
            request.msg(res.msg)

            if (res.state) {
              var realName = self.data.realName
              var error_msg = self.data.error_msg

              var company_name = res.data.companyName
              var company_code = res.data.socialCreditCode
              var name = res.data.legalPerson
              var type_index =
                res.data.companyType === '无'
                  ? 0
                  : res.data.companyType === '个体工商户'
                  ? 2
                  : 1

              if (realName != undefined && realName != '') {
                if (name !== realName) {
                  request.Modal(error_msg)
                }
              }

              self.setData({
                company_name: company_name,
                company_code: company_code,
                name: name,
                type_index: type_index,
                uploadTitle: '重新上传'
              })
            }
          })
        } else {
        }
      }
    })
  }
  uploadIdCard = () => {
    Taro.showActionSheet({
      //todo 相机拍摄
      itemList: ['本地上传'],
      success: res => {
        if (res.tapIndex == 0) {
          request.uploadIdCard(res => {
            request.msg(res.msg)

            if (res.state) {
              var name = self.data.name
              var error_msg = self.data.error_msg

              var idCardNum = res.data.idCardNum
              var realName = res.data.realName

              if (name != undefined && name != '') {
                if (name !== realName) {
                  request.Modal(error_msg)
                }
              }

              self.setData({
                idCardNum: idCardNum,
                realName: realName,
                uploadTitleIdCard: '重新上传'
              })
            }
          })
        } else {
        }
      }
    })
  }
  config = {
    navigationBarTitleText: '快速注册'
  }

  render() {
    const {
      uploadTitle: uploadTitle,
      type_index: type_index,
      type_array: type_array,
      company_name: company_name,
      company_code: company_code,
      name: name,
      uploadTitleIdCard: uploadTitleIdCard,
      realName: realName,
      idCardNum: idCardNum,
      legal_persona_wechat: legal_persona_wechat,
      btnStyle: btnStyle
    } = this.state
    return (
      <Form onSubmit={this.formSubmit}>
        <View className="fastRegister_tab">
          <View className="fastRegister_tab_title">主体信息</View>
          <View className="fastRegister_tab_one">
            <View className="fastRegister_tab_one_left">营业执照</View>
            <View
              className="fastRegister_tab_one_right"
              onClick={this.uploadBusinessLicense}
            >
              <View style="padding-right: 8px;">
                {uploadTitle}
                <Image
                  src={require('../../../image/turn_right.png')}
                  className="picker_turn"
                />
              </View>
            </View>
            <View style="clear: both" />
          </View>
          <View className="fastRegister_tab_one">
            <View className="fastRegister_tab_one_left">主体类型</View>
            <View className="fastRegister_tab_one_right">
              <Picker
                mode="selector"
                name="type_company"
                onChange={this.change_picker}
                value={type_index}
                range={type_array}
              >
                <View className="picker" style="padding-right: 20rpx">
                  {type_array[type_index]}
                  <Image
                    src={require('../../../image/turn_right.png')}
                    className="picker_turn"
                  />
                </View>
              </Picker>
            </View>
            <View style="clear: both" />
          </View>
          <View className="fastRegister_tab_one">
            <View className="fastRegister_tab_one_left">主体名称</View>
            <View className="fastRegister_tab_one_right">
              <Input
                type="text"
                name="company_name"
                value={company_name}
                placeholder="请输入企业名称"
                placeholderStyle="color:#999999"
              />
            </View>
            <View style="clear: both" />
          </View>
          <View className="fastRegister_tab_one">
            <View className="fastRegister_tab_one_left">营业执照注册号</View>
            <View className="fastRegister_tab_one_right">
              <Input
                type="text"
                name="company_code"
                value={company_code}
                placeholder="请输入营业执照注册号"
                placeholderStyle="color:#999999"
              />
            </View>
            <View style="clear: both" />
          </View>
          <View className="fastRegister_tab_one">
            <View className="fastRegister_tab_one_left">法人姓名</View>
            <View className="fastRegister_tab_one_right">
              <Input
                type="text"
                name="name"
                value={name}
                placeholder="小程序管理员姓名"
                placeholderStyle="color:#999999"
              />
            </View>
            <View style="clear: both" />
          </View>
        </View>
        {/* 用户信息 */}
        <View className="fastRegister_tab">
          <View className="fastRegister_tab_title">用户信息</View>
          <View className="fastRegister_tab_one">
            <View className="fastRegister_tab_one">
              <View className="fastRegister_tab_one_left">身份证</View>
              <View
                className="fastRegister_tab_one_right"
                onClick={this.uploadIdCard}
              >
                <View style="padding-right: 8px;">
                  {uploadTitleIdCard}
                  <Image
                    src={require('../../../image/turn_right.png')}
                    className="picker_turn"
                  />
                </View>
              </View>
              <View style="clear: both" />
            </View>
            <View className="fastRegister_tab_one_left">用户姓名</View>
            <View className="fastRegister_tab_one_right">
              <Input
                type="text"
                name="realName"
                value={realName}
                placeholder="小程序管理员姓名"
                placeholderStyle="color:#999999"
              />
            </View>
            <View style="clear: both" />
          </View>
          <View className="fastRegister_tab_one">
            <View className="fastRegister_tab_one_left">用户身份证</View>
            <View className="fastRegister_tab_one_right">
              <Input
                type="text"
                name="person_sn"
                value={idCardNum}
                placeholder="小程序管理员身份证"
                placeholderStyle="color:#999999"
              />
            </View>
            <View style="clear: both" />
          </View>
          <View className="fastRegister_tab_one">
            <View className="fastRegister_tab_one_left">用户微信号</View>
            <View className="fastRegister_tab_one_right">
              <Input
                type="text"
                name="legal_persona_wechat"
                value={legal_persona_wechat}
                placeholder="小程序管理员微信号"
                placeholderStyle="color:#999999"
              />
            </View>
            <View style="clear: both" />
          </View>
        </View>
        {/* 推荐人 */}
        <View className="fastRegister_tab">
          <View className="fastRegister_tab_title">推荐人</View>
          <View className="fastRegister_tab_one">
            <View className="fastRegister_tab_one_left">推荐人编号</View>
            <View className="fastRegister_tab_one_right">
              <Input
                type="number"
                name="workNumber"
                value={legal_persona_wechat}
                placeholder="推荐人编号（选填）"
                placeholderStyle="color:#999999"
              />
            </View>
            <View style="clear: both" />
          </View>
        </View>
        {/* 页面底部tip 开始 */}
        <View className="tip">
          <View className="tip_title_page">提示:</View>
          <View className="tip_item">
            1. 快速注册小程序 要求法人身份信息和管理员身份信息一致
          </View>
          <View className="tip_item">
            2. 上传照片后 系统将快速录入相关信息 核对信息无误即可
          </View>
          <View className="tip_item">
            3. 用户微信号位置 请打开 微信-我-微信号
          </View>
        </View>
        {/* 页面底部tip 结束 */}
        <View>
          <Button className="submit_button" formType="submit" style={btnStyle}>
            提交
          </Button>
        </View>
      </Form>
    )
  }
}

export default _C

import { Block, View, Button, Form, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class UserLoginTmpl extends Taro.Component {
  render() {
    const { data: chang_tab } = this.props
    return (
      <Block>
        {!is_login && (
          <View className="user_getphone">
            <View className="user_getphone_mask" onClick={this.close_login} />
            <View className="user_getphone_view">
              <View className="user_getphone_view_all_tab">
                <View
                  className={
                    'tab_one ' + (chang_tab == 2 ? 'tab_one_no_select' : '')
                  }
                  onClick={this.chang_tab}
                  data-id="1"
                >
                  微信登录
                </View>
                <View
                  className={
                    'tab_one ' + (chang_tab == 1 ? 'tab_one_no_select' : '')
                  }
                  onClick={this.chang_tab}
                  data-id="2"
                >
                  账号登录
                </View>
                <View style="clear:both" />
              </View>
              {chang_tab == 1 ? (
                <View>
                  <View className="user_getphone_view_title">快速登录</View>
                  <View className="user_getphone_view_desc">
                    使用微信登录，获取您的信息！
                  </View>
                  <View>
                    <Button
                      openType="getPhoneNumber"
                      onGetphonenumber={this.getauth_phone}
                      className="user_getphone_view_button"
                    >
                      确定
                    </Button>
                    <Button
                      onClick={this.close_login}
                      className="user_getphone_view_button"
                      style="background: #d9534f"
                    >
                      关闭
                    </Button>
                  </View>
                </View>
              ) : (
                <View style="padding: 20rpx 0 0">
                  <Form onSubmit={this.login_submit} onReset={this.close_login}>
                    <View className="phone_one">
                      <View className="phone_one_left">账号</View>
                      <View className="phone_one_right">
                        <Input
                          name="phone"
                          type="text"
                          placeholder="请输入账号"
                        />
                      </View>
                      <View style="clear: both" />
                    </View>
                    <View className="phone_one">
                      <View className="phone_one_left">密码</View>
                      <View className="phone_one_right">
                        <Input
                          name="password"
                          type="password"
                          placeholder="请输入密码"
                        />
                      </View>
                      <View style="clear: both" />
                    </View>
                    <View style="padding-top: 40rpx">
                      <Button
                        formType="submit"
                        className="user_getphone_view_button"
                      >
                        确定
                      </Button>
                      <Button
                        formType="reset"
                        className="user_getphone_view_button"
                        style="background: #d9534f"
                      >
                        关闭
                      </Button>
                    </View>
                  </Form>
                </View>
              )}
            </View>
          </View>
        )}
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}

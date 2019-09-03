import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';

import './index.scss';

class Auth extends Taro.Component {
    static config = {
        navigationBarTitleText: '小程序授权',
    };
    
    constructor(props) {
        super(props);
        let params = this.$router.params || {};
        let bind_url_mob = params.bind_url_mob || '';
        this.state = {
            bind_url_mob: 'https://mp.weixin.qq.com/safe/bindcomponent?action=bindcomponent&auth_type=2&no_scan=1&component_appid=wxd32bb7304a770020&pre_auth_code=preauthcode@@@stZ7CA-X3Wzz6EOhQ_3_9Vcpz2lckhAXAXSSOOHI10bjf0WnSOT9DSoto_vBAIOe&redirect_uri=https%3A%2F%2Fweixin.258m.com%2Fwei_bind_callback%3Ftoken%3D14e610ebcc888e57e5d3c8b78efeb4f5#wechat_redirect'
        }
    }
    
    copy() {
        const { bind_url_mob } = this.state;
        Taro.setClipboardData({data: bind_url_mob}).then(() => {
            Taro.showToast({title: '复制成功', icon: 'none'});
        });
    }
    
    render() {
        const { bind_url_mob } = this.state;
        
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
                <Button onClick={this.copy.bind(this)}>
                    复制授权链接
                </Button>
            </View>
        )
    }
}

export default Auth

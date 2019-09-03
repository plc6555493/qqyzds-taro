import Taro from '@tarojs/taro';
import { View, Text, Input, Button } from '@tarojs/components';
import { AtNoticebar } from 'taro-ui';

import './index.scss';

class Pay extends Taro.Component {
    static config = {
        navigationBarTitleText: '商户信息设置'
    }
    
    constructor(props) {
        super(props);
        let params = this.$router.params || {};
        let appId = params.appId || '';
        this.state = {
            appId: appId,
            mch_id: '',
            mch_key: ''
        }
    }
    
    componentWillMount() {

    }
    
    onChange(type, e) {
        this.setState({ [type]: e.target.value });
    }
    
    modifyMchId() {
        const { mch_id, mch_key } = this.state;
        
        if (!mch_id) {
            Taro.showToast({title: '请输入商户号', icon: 'none'});
            return
        }
    
        if (!mch_key) {
            Taro.showToast({title: '请输入商户秘钥', icon: 'none'});
            return
        }
    }
    
    render() {
        const { mch_id, mch_key } = this.state;
        return (
            <View className="container">
              <AtNoticebar>[提示]请勿重复修改，影响线上的微信支付环境。</AtNoticebar>
              <View className="item">
                <Text className="item_left">商户号</Text>
                <Input
                    placeholder="请输入商户号"
                    value={mch_id}
                    onInput={this.onChange.bind(this, 'mch_id')}
                />
              </View>
              <View className="item">
                <Text className="item_left">商户秘钥</Text>
                <Input
                    placeholder="请输入商户秘钥"
                    value={mch_key}
                    onInput={this.onChange.bind(this, 'mch_key')}
                />
              </View>
              <View className="btn_container">
                <Button onClick={this.modifyMchId.bind(this)}>提交修改</Button>
              </View>
            </View>
        )
    }
}

export default Pay

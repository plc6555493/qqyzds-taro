import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Input, Button } from '@tarojs/components';
import { AtNoticebar } from 'taro-ui';

import './index.scss';
const request = require('../../../utils/request.js')

class Signature extends Taro.Component {
    static config = {
        navigationBarTitleText: '修改小程序简介'
    }
    
    constructor(props) {
        super(props);
        let signature = props.store.signature || '';
        this.state = {
            signature: signature, //简介
            modify_used_count: 0, //本月修改次数
            modify_quota: 0 //本月限制次数
        }
    }
    
    componentWillMount() {
        //let signature_info = JSON.parse(options.signature_info || '{}')
        //this.setData({
        //    signature: signature_info.signature || '',
        //    modify_quota: signature_info.modify_quota || 0,
        //    modify_used_count: signature_info.modify_used_count || 0
        //})
    }
    
    onChange(e) {
        this.setData({ signature: e.target.value });
    }
    
    modifySignature() {
        let { signature, modify_used_count, modify_quota } = this.state;
        let modify_rest = modify_quota - modify_used_count
        
        if (modify_quota && modify_used_count >= modify_quota) {
            Taro.showToast({
                title: '本月修改次数已使用完毕，无法再次修改',
                icon: 'none'
            })
            return
        }
        
        if (!signature) {
            Taro.showToast({
                title: '请输入小程序简介',
                icon: 'none'
            })
            return
        }
        
        Taro.showModal({
            title: '提示',
            content: `本月剩余修改次数${modify_rest}次，确认是否执行此次修改`,
            success: res => {
                if (res.confirm) {
                    request.request(
                        'fastRegisterWeappModifySignature',
                        {
                            signature: signature
                        },
                        res => {
                            Taro.showToast({
                                title: res.msg,
                                icon: 'none',
                                mask: true,
                                success: () => {
                                    Taro.navigateBack()
                                }
                            })
                        }
                    )
                }
            }
        })
    }
    
    render() {
        const { signature, modify_quota, modify_used_count } = this.state;
        
        return (
            <View className="container">
              <AtNoticebar>{`[提示]本月修改额度${modify_quota}次，已修改次数${modify_used_count}次`}</AtNoticebar>
              <View className="item">
                <Text className="item_left">简介</Text>
                <Input
                    type="text"
                    name="signature"
                    placeholder="请填写简介内容"
                    value={signature}
                    onInput={this.onChange.bind(this)}
                />
              </View>
              <Button onClick={this.modifySignature.bind(this)}>修改</Button>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        store: state.store || {}
    }
};

export default connect(mapStateToProps)(Signature)

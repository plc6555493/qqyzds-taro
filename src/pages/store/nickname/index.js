import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Input, Button } from '@tarojs/components';
import { AtNoticebar } from 'taro-ui';

import './index.scss';
const request = require('../../../utils/request.js');

class Nickname extends Taro.Component {
    static config = {
        navigationBarTitleText: '修改小程序名称'
    }
  
    constructor(props) {
        super(props);
        let nickname = props.store.name || '';
        this.state = {
            nickname: nickname, //名称
            disabled: false
        }
    }
    
    componentWillMount() {
        //let nickname = options.nickname || ''
        //this.setData({
        //    nickname: nickname,
        //    disabled: nickname ? true : false
        //})
    }
    
    onChange(e) {
        this.setState({ nickname: e.target.value });
    }
    
    checkNickname() {
        let { nickname } = this.state;
        
        request.request(
            'min/checkWxVerifyNickName',
            { nick_name: nickname, check_type: 1 },
            res => {
                request.msg(res.msg)
            }
        )
    }
    modifyNickname() {
        let {nickname} = this.state
    
        if (!nickname) {
            request.msg('名称不能为空')
            return
        }
    
        request.Modal(
            '只允许更改一次，确定更新小程序名称？',
            res => {
                if (res.confirm) {
                    request.request(
                        'fastRegisterWeappSetNickName',
                        {
                            nick_name: nickname,
                            nick_type: 2
                        },
                        res => {
                            request.msg(res.msg)
                            this.setData({disabled: true})
                        }
                    )
                }
            },
            true
        )
    }
    
    render() {
        const { nickname, disabled } = this.state;
        
        return (
            <View className="container">
              <AtNoticebar>{`[提示]小程序名称只能修改一次，请谨慎填写小程序名称。可使用下面[检测名称]按钮校验小程序名称的可用性和合法性。`}</AtNoticebar>
              <View className="item">
                <Text className="item_left">名称</Text>
                <Input
                    type="text"
                    name="nickname"
                    placeholder="请填写名称"
                    value={nickname}
                    onInput={this.onChange.bind(this)}
                    disabled={disabled}
                />
              </View>
              <View className="btn_container">
                <Button onClick={this.checkNickname.bind(this)}>检测名称</Button>
                <Button onClick={this.modifyNickname.bind(this)} disabled={disabled}>
                  修改名称
                </Button>
              </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        store: state.store || {}
    }
};

export default connect(mapStateToProps)(Nickname)

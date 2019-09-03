import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { View, Text } from '@tarojs/components';
import { AtInput, AtButton, AtIcon } from 'taro-ui';

import './index.scss';

import { wxBindPhone, login, wxLogin } from '../../reducers';
import { showToast } from '../../utils';
import { post, get } from '../../../src/service/request';

class Login extends Taro.Component {
    
    static options = {
        addGlobalClass: true
    };
    
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            change: true,
            phone: '',
            password: ''
        }
    }
    
    componentDidMount() {
        const { isLogin } = this.props;
        if (!isLogin) {
            Taro.login().then((res) => {
                return this.props.wxLogin(res.code);
            }).catch(() => {
                this.setState({isShow: true});
            });
        }
    }
    
    onClose() {
        this.setState({isShow: false});
    }
    
    stopBubble(e) {
        e.stopPropagation()
    }
    
    onChange(type, text) {
        this.setState({[type]: text});
    }
    
    wxBindPhone(e) {
        // let params = e.detail;
        // this.props.wxBindPhone(params).then(() => {
        //     this.setState({isShow: false});
        // });

        //Taro.login().then(res=>{
        //    let data1={code:res.code};
        //    post('api/api.php?platform=mini.program&r=wxapp.login',data1).then(res=>{
        //        let data2={
        //            data:e.detail.encryptedData,
        //            iv:e.detail.iv,
        //            sessionKey:res.session_key
        //        };
        //        res.error ? Taro.showToast({title:'获取用户登录状态失败'}) :
        //            get('api/api.php?platform=mini.program&r=wxapp.auth',data2).then(res=>{
        //                res.isblack == 1 && Taro.showModal({
        //                    title: "无法访问",
        //                    content: "您在商城的黑名单中，无权访问！",
        //                    success:function (res) {
        //
        //                    }
        //                });
        //                if ( res.error ) {
        //                    this.setState({isShow:true})
        //                } else {
        //                    let userInfo = {
        //                        id:'',
        //                        openid:'',
        //                        uniacid:''
        //                    };
        //                    userInfo.openid = res.openId || '';
        //                    userInfo.id = res.id || '';
        //                    userInfo.uniacid = res.uniacid || '';
        //                    e.detail.userInfo = userInfo;
        //                    Taro.setStorageSync("userinfo",e.detail.userInfo);
        //                    Taro.setStorageSync("userinfo_openid", e.detail.userInfo.openid);
        //                    Taro.setStorageSync("userinfo_id", e.detail.userInfo.id);
        //                    this.setState({isShow:false})
        //                }
        //            })
        //    })
        //})
    
        Taro.login().then((res) => {
            post('api/api.php?platform=mini.program&r=wxapp.login',{code: res.code}).then((res) => {
                if (res.error) {
                    Taro.showToast({title:'获取用户登录状态失败'});
                    return
                }
    
                get('api/api.php?platform=mini.program&r=wxapp.auth',{
                    data: e.detail.encryptedData,
                    iv: e.detail.iv,
                    sessionKey: res.session_key
                }).then((userInfo) => {
                    userInfo.isblack == 1 && Taro.showModal({
                        title: "无法访问",
                        content: "您在商城的黑名单中，无权访问！"
                    });
                    
                    if (res.error) {
                        this.setState({isShow:true});
                    } else {
                        Taro.setStorageSync("userinfo", userInfo);
                        Taro.setStorageSync("userinfo_openid", res.openid);
                        this.setState({isShow:false});
                    }
                });
            });
        });
    }
    
    login() {
        const { phone, password } = this.state;
        if (!phone) {
            showToast('请输入账号');
            return
        }
        
        if (!password) {
            showToast('请输入密码');
            return
        }
        
        this.props.login(phone, password).then(() => {
            this.setState({isShow: false});
        });
    }

    render() {
        const { change, isShow, phone, password } = this.state;
        return (
            isShow && (
                <View className='back' onClick={this.stopBubble.bind(this)}>
                    <View className='login'>
                        {/*头部标题和关闭按钮*/}
                        <View className='head'>
                            <Text　className='title'>{change ? '微信授权登录' : '账号密码登录'}</Text>
                            <AtIcon value='close-circle' size='20' color='#999' onClick={this.onClose.bind(this)}></AtIcon>
                        </View>
                        <View className='body'>
                            {change?
                                /*微信授权登录*/
                                (
                                    <View className='at-row at-row__direction--column at-row__align--center'>
                                        <Text>获取当前微信账号</Text>
                                        <Text style={{marginTop: '10rpx'}}>使用当前微信账号进行登录</Text>
                                    </View>
                                )
                                :
                                /*账号密码登录*/
                                (
                                    <View　className='count'>
                                        <AtInput
                                            className='count-input'
                                            name='value1'
                                            title='账号'
                                            type='text'
                                            placeholder='请输入账号'
                                            value={phone}
                                            onChange={this.onChange.bind(this,'phone')}
                                        />
                                        <AtInput
                                            className='count-input'
                                            name='value2'
                                            title='密码'
                                            type='password'
                                            placeholder='请输入密码'
                                            value={password}
                                            onChange={this.onChange.bind(this,'password')}
                                        />
                                    </View>
                                )
                            }
                        </View>
                        {/*底部确认按钮和切换登录方式*/}
                        <View className='foot'>
                            {
                                change ? (
                                    <AtButton
                                        size='small'
                                        customStyle={{width: '80%'}}
                                        openType="getPhoneNumber"
                                        onGetPhoneNumber={this.wxBindPhone.bind(this)}
                                    >
                                        确定
                                    </AtButton>
                                ) : (
                                    <AtButton size='small' customStyle={{width: '80%'}} onClick={this.login.bind(this)}>确定</AtButton>
                                )
                            }
                            <Text onClick={() => {
                                this.setState({change: !change});
                            }} style={{marginTop: '10rpx', fontSize: '24rpx', padding: '10rpx 0'}}>{change?'账号密码登录':'微信授权登录'}</Text>
                        </View>
                    </View>
                </View>
            )
        )
    }
}

const mapStateToProps = (state) => {
    let auth = state.auth || {};
    return {
        isLogin: auth.isLogin || false
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({wxBindPhone, login, wxLogin}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)

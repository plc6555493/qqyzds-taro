import Taro from '@tarojs/taro';
import { Form, View, Input } from '@tarojs/components';
import { AtButton } from 'taro-ui';

import './index.scss';
import { applet } from '../../../apis';
import { showToast } from '../../../utils';

class Register extends Taro.Component {
    static config = {
        navigationBarTitleText: '小程序快速注册'
    };
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            code: '',
            legal_persona_name: '',
            legal_persona_wechat: '',
            workNumber: ''
        }
    }
    
    handleChange(type, e) {
        this.setState({[type]: e.detail.value});
    }
    
    register() {
        const { name, code, legal_persona_name, legal_persona_wechat, workNumber } = this.state;
        
        if (!name) {
            showToast('请填写主体名称');
            return
        }
    
        if (!code) {
            showToast('请填写营业执照代码');
            return
        }
    
        if (!legal_persona_name) {
            showToast('请输入法人姓名');
            return
        }
    
        if (!legal_persona_wechat) {
            showToast('请输入法人微信号');
            return
        }
        
        Taro.showLoading();
        applet.registerWeapp({
            name: name,
            code: code,
            code_type: 1,
            legal_persona_name: legal_persona_name,
            legal_persona_wechat: legal_persona_wechat,
            workNumber: workNumber || ''
        }).then((res) => {
            Taro.hideLoading();
            showToast('注册成功');
            Taro.navigateBack();
        }).catch((e) => {
            Taro.hideLoading();
            showToast(e.message || '');
        });
    }
    
    render() {
        const {} = this.state;
        
        return (
            <View className='container'>
                <View className='paper'>
                    <View className='paper_item'>
                        <Text className="typo_semibold">主体信息</Text>
                    </View>
                    <View className='paper_item'>
                        <Text>主体名称</Text>
                        <Input
                            type="text"
                            name="name"
                            placeholder="需与工商部门登记信息一致"
                            placeholderStyle="color:#999999"
                            onChange={this.handleChange.bind(this,'name')}
                        />
                    </View>
                    <View className='paper_item'>
                        <Text>营业执照代码</Text>
                        <Input
                            type="text"
                            name="code"
                            placeholder="统一社会信用代码"
                            placeholderStyle="color:#999999"
                            onChange={this.handleChange.bind(this,'code')}
                        />
                    </View>
                    <View className='paper_item'>
                        <Text>法人姓名</Text>
                        <Input
                            type="text"
                            name="legal_persona_name"
                            placeholder="需与营业执照一致"
                            placeholderStyle="color:#999999"
                            onChange={this.handleChange.bind(this,'legal_persona_name')}
                        />
                    </View>
                    <View className='paper_item no_bottom_line'>
                        <Text>法人微信号</Text>
                        <Input
                            type="text"
                            name="legal_persona_wechat"
                            placeholder="法人实名绑卡微信号"
                            placeholderStyle="color:#999999"
                            onChange={this.handleChange.bind(this,'legal_persona_wechat')}
                        />
                    </View>
                </View>
    
                <View className='paper'>
                    <View className='paper_item'>
                        <Text className="typo_semibold">推荐人</Text>
                    </View>
                    <View className='paper_item no_bottom_line'>
                        <Text>推荐人编号</Text>
                        <Input
                            type="number"
                            name="workNumber"
                            placeholder="推荐人编号(选填)"
                            placeholderStyle="color:#999999"
                            onChange={this.handleChange.bind(this,'workNumber')}
                        />
                    </View>
                </View>
    
                <View className="tip">
                    <Text>提示:</Text>
                    <Text>1. 快速注册小程序 要求法人身份信息和管理员身份信息一致。</Text>
                    <Text>2. 用户微信号位置 请打开 微信-我-微信号。</Text>
                </View>
    
                <View className='submit_btn'>
                    <AtButton formType="submit" onClick={this.register.bind(this)}>提交注册</AtButton>
                </View>
            </View>
        )
    }
}

export default Register

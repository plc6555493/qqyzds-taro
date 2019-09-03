import Taro from '@tarojs/taro';
import { View, Text, Button, Input, ScrollView } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtNoticebar, AtButton } from "taro-ui";

import './index.scss';

class Experience extends Taro.Component {
    static config = {
        navigationBarTitleText: '体验者列表'
    }
    
    constructor(props) {
        super(props);
        this.state = {
            show_change: false,
            data: [],
            isOpened: false,
            wechatid: ''
        }
    }
    
    componentDidMount() {
        //request.request('getBindTestUserList', {}, res => {
        //    let experience = res.data
        //    self.setData({ experience: experience })
        //})
    }
    
    handleCancel() {
        this.setState({isOpened: false});
    }
    
    onChange(e) {
        this.setState({wechatid: e.target.value});
    }
    
    add() {
        const { wechatid, data } = this.state;
        if (!wechatid) {
            Taro.showToast({title: '请输入体验者微信号', icon: 'none'});
            return
        }
        
        data.push({
            wechatid: wechatid,
            create_time_date: '2019-10-10 10:10:10'
        });
    
        Taro.showToast({title: '添加成功', icon: 'none'});
        this.setState({data: data, wechatid: '', isOpened: false});
    }
    
    delete(wechatid, index) {
        const { data } = this.state;
        
        Taro.showModal({
            title: '提示',
            content: '您确定要解除绑定吗？',
            showCancel: true
        }).then((res) => {
            if (res.confirm) {
                data.splice(index, 1);
    
                Taro.showToast({title: '解绑成功', icon: 'none'});
                this.setState({data: data});
            }
        })
    }
    
    render() {
        const { data, wechatid, isOpened } = this.state;
        
        return (
            <View className='container'>
                <AtNoticebar>[提示]请勿将手机号当成微信号，微信号不等于手机号。</AtNoticebar>
                <ScrollView className="experience">
                    <View className="experience_one">
                        <Text className="experience_one_left typo_semibold">序号</Text>
                        <Text className="experience_one_center typo_semibold">微信号</Text>
                        <Text className="experience_one_right typo_semibold">绑定时间</Text>
                        <Text className="experience_one_del typo_semibold" style={{color: '#666'}}>操作</Text>
                    </View>
                    {
                        data.map((item, index) => {
                            return (
                                <View className="experience_one" key={index}>
                                    <Text className="experience_one_left">{index + 1}</Text>
                                    <Text className="experience_one_center">{item.wechatid}</Text>
                                    <Text className="experience_one_right">{item.create_time_date}</Text>
                                    <Text className="experience_one_del" onClick={this.delete.bind(this, item.wechatid, index)}>解绑</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <AtButton
                    full
                    className='bottom_button'
                    onClick={() => {
                        this.setState({isOpened: true});
                    }}
                >
                    添加体验者
                </AtButton>
    
                <AtModal isOpened={isOpened}>
                    <AtModalHeader>添加体验者</AtModalHeader>
                    <AtModalContent>
                        <Input
                            placeholder="体验者微信号"
                            value={wechatid}
                            onInput={this.onChange.bind(this)}
                        />
                    </AtModalContent>
                    <AtModalAction>
                        <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                        <Button onClick={this.add.bind(this)}>确定</Button>
                    </AtModalAction>
                </AtModal>
            </View>
        )
    }
}

export default Experience

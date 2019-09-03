import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon, AtDivider, AtButton } from 'taro-ui';

import './index.scss';

class Index extends Taro.Component {
    static config = {
        navigationBarTitleText: '店铺信息',
    };
    
    constructor(props) {
        super(props);
        this.state = {
            meuns: [
                {title: '小程序信息', icon: 'form_fill', path: '/pages/store/info/index'},
                {title: '购买记录', icon: 'ticket', path: '/pages/store/buyrecord/index'},
                {title: '发布审核', icon: 'profile_fill', path: '/pages/store/publish/index'},
                {title: '绑定体验者', icon: 'friend_add_fill', path: '/pages/store/experience/index'},
                {title: '商户信息', icon: 'shop', path: '/pages/store/pay/index'},
                {title: '小程序授权', icon: 'safe', path: '/pages/store/auth/index'}
            ],
            courses: [
                {title:'如何快速注册小程序',path:'/pages/store/courses/index'},
                {title:'如何开通微信支付',path:''},
                {title:'发布和审核小程序',path:''},
                {title:'正式版和体验版的区别',path:''},
                {title:'注册完小程序没有在后台看到',path:''},
                {title:'小程序资料修改说明',path:''},
                {title:'应用购买和续费',path:''},
                {title:'注册小程序失败原因',path:''},
                {title:'小程序审核失败原因',path:''},
            ]
        }
    }
    
    //注册小程序
    register() {
        Taro.navigateTo({url: '/pages/store/register/index'});
    }
    
    navigateTo(path, params) {
        if (path) {
            Taro.navigateTo({url: path});
        }
    }

    //跳转至教程
    toCourse ( index ) {
        const { courses } = this.state;
        Taro.navigateTo({ url:courses[index].path })
    }
    
    render() {
        const { meuns, courses } = this.state;
        const { store } = this.props;
        console.log(store);
        return(
            <View className='container'>
                {
                    store.init ? (
                        <View className='at-row at-row__align--center head'>
                            <Image className='img' src={store.imgUrl} onClick={this.navigateTo.bind(this, '/pages/store/info/index')}/>
                            <View className='at-row at-col at-row__direction--column' style={{marginRight: '20px'}}>
                                <View className='at-row at-row__align--center'>
                                    <Text className='store_name'>{store.name}</Text>
                                    <Text className='tip'>已认证</Text>
                                </View>
                                <View>
                                    <Text className='store_id'>{`店铺编号: ${store.store_id}`}</Text>
                                </View>
                                <View>
                                    <Text className='rest_balance'>{`余额：${0.00}`}</Text>
                                </View>
                                <View>
                                    <Text className='expire_time'>{store.expireTime}</Text>
                                </View>
                            </View>
                            <AtButton size='small' circle onClick={this.navigateTo.bind(this, '/pages/store/recharge/index')}>充值</AtButton>
                            <AtIcon className='code' prefixClass='iconfont' value='qrcode' size='30' color='#333' onClick={this.navigateTo.bind(this, '/pages/store/qrcode/index')}/>
                        </View>
                    ) : (
                        <View className='at-row at-row__align--center at-row__justify--center head' onClick={this.register.bind(this)}>
                            <Text className='fast'>快速注册小程序</Text>
                        </View>
                    )
                }
                
                
                {
                    store.init && (
                        <View className='at-row at-row--wrap menus'>
                            {
                                meuns.map((item, index) => {
                                    return(
                                        <View
                                            key={index}
                                            className='at-row at-row__direction--column at-row__justify--center at-row__align--center menu'
                                            onClick={this.navigateTo.bind(this, item.path)}
                                        >
                                            <View className='menu-img at-row at-row__align--center at-row__justify--center'>
                                                {/*<Image src={item.icon}/>*/}
                                                <AtIcon prefixClass='iconfont' value={item.icon} size='35' color='#ff4d4f'/>
                                            </View>
                                            <Text>{item.title}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                }

                <View className='at-row at-row__direction--column courses'>
                    <View className='courses-title'>教程</View>
                    <AtDivider/>
                    {
                        courses.map((item, index) => {
                            return(
                                <View className='at-row at-row__direction--column courses-box' key={index} onClick={this.toCourse.bind(this,index)}>
                                    <View className='at-row at-row__justify--between at-row__align--center course'>
                                        <Text className='course-title'>{item.title}</Text>
                                        <AtIcon value='chevron-right' size='18' color='#999'/>
                                    </View>
                                    {
                                        (index+1) !== courses.length && <AtDivider/>
                                    }
                                </View>
                            )
                        })
                    }
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

export default connect(mapStateToProps)(Index)

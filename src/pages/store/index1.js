import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { AtIcon, AtButton } from 'taro-ui';

import './index1.scss';

class Index extends Taro.Component {
    static config = {
        navigationBarTitleText: '店铺信息',
    };
    
    constructor(props) {
        super(props);
        this.state = {
            meuns: [
                [
                    {title: '店铺装饰', icon: 'shop', path: '/pages/store/diy/index'},
                    {title: '商品管理', icon: 'goods'},
                    {title: '订单管理', icon: 'order-manage'},
                    {title: '用户管理', icon: 'user-manage'},
                ],
                [
                    {title: '数据统计', icon: 'data-statistics'},
                    {title: '客服消息', icon: 'customer-service'},
                    {title: '扫码核销', icon: 'scan'},
                    {title: '应用', icon: 'application'}
                ]
            ],
            records: [
                [
                    {title: '支付订单数'},
                    {title: '支付金额(元)'},
                    {title: '客单价(元)'}
                ],
                [
                    {title: '支付人数'},
                    {title: '访客数'},
                    {title: '下单件数'},
                ]
            ]
        }
    }
    
    //注册小程序
    register() {
        Taro.navigateTo({url: '/pages/applet/register/index'});
    }
    
    navigateTo(path, params) {
        if (path) {
            Taro.navigateTo({url: path});
        }
    }
    
    render() {
        const { meuns, records } = this.state;
        const { store } = this.props;
        
        return(
            <View className='container'>
                <View className='info_container'>
                    <View className='info'>
                        <View className='at-row at-row__direction--row-reverse'>
                            <View className='at-row at-row__justify--center at-row__align--center endTime'>
                                <Text className='typo_h6'>免费使用剩余5天</Text>
                                <AtIcon value='chevron-right' size='13' color='#ffffff'/>
                            </View>
                        </View>
                        <View className='statistics'>
                            <View className='edit'>
                                <Text className='typo_h3' style={{color: '#fff'}}>今日业绩</Text>
                            </View>
                            <View className='records'>
                                {
                                    records.map((item, index) => {
                                        return(
                                            <View key={index} className='at-row record_item' style={{borderBottom: index+1 === records.length ?  '' : '1rpx solid rgba(255,255,255,0.3)'}}>
                                                {
                                                    item.map((items, idx) => {
                                                        return(
                                                            <View
                                                                key={idx}
                                                                className='at-row at-row__direction--column at-row__align--center at-row__justify--center record_cell'
                                                                style={{borderRight: idx+1 === item.length ?  '' : '1rpx solid rgba(255,255,255,0.3)'}}
                                                            >
                                                                <Text className='typo_h6' style={{color: '#fff'}}>{items.title || ''}</Text>
                                                                <Text className='typo_h4' style={{marginTop: '10rpx', color: '#fff'}}>0</Text>
                                                            </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    {
                        !store.init && (
                            <View className='menus'>
                                {
                                    meuns.map((item, index) => {
                                        return(
                                            <View key={index} className='at-row menu_item'>
                                                {
                                                    item.map((items, idx) => {
                                                        return(
                                                            <View
                                                                key={idx}
                                                                className='at-row at-row__direction--column at-row__align--center at-row__justify--center menu_cell'
                                                                onClick={this.navigateTo.bind(this, items.path || '')}
                                                            >
                                                                <View className='icon'>
                                                                    <AtIcon  prefixClass='iconfont' value={items.icon} size='25' color='#f5222d'/>
                                                                </View>
                                                                <Text className='typo_h5' style={{marginTop: '10rpx'}}>{items.title || ''}</Text>
                                                            </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    }
                </View>
                {
                    !store.init && (
                        <View className='at-col at-row at-row__align--center at-row__justify--center'>
                            <View className='register'>
                                <AtButton onClick={this.register.bind(this)}>快速注册小程序</AtButton>
                            </View>
                        </View>
                    )
                }
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
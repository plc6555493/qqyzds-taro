import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton, AtAvatar, AtTag } from 'taro-ui';

import './index.scss';

class Recharge extends Taro.Component {
    static config = {
        navigationBarTitleText: '余额充值',
    };
    
    constructor(props) {
        super(props);
        this.state = {
            storeInfo: {
                storeId: '',
                storeName: '',
                init: false,//判断是否创建了小程序
                expiresTime: null,
                diypage: {},
                store_id: '1123',
                imgUrl: 'https://biz.258m.com/attachment/images/4/2019/07/GVvNHV6CfWhLF6rcHfBl3OF3bFw7z6.png',
                name: '世窗商城',
                expireTime: '2019-10-10',
                pirce: 0.00
            },
            rechargeClassify: [
                {price: 10},
                {price: 20},
                {price: 50},
                {price: 100},
                {price: 200},
                {price: 500},
            ],
            selectRecharge: {}
        }
    }
    
    selectRecharge(item) {
        this.setState({selectRecharge: item});
    }
    
    navigateTo(path) {
        path && Taro.navigateTo({url: path});
    }
    
    sureRecharge() {
    
    }
    
    render() {
        const { rechargeClassify, selectRecharge, storeInfo } = this.state;
        
        return(
            <View className='container'>
                <View className='header at-row at-row__align--center'>
                    <AtAvatar className='avatar' circle image={storeInfo.imgUrl}></AtAvatar>
                    <View className='info at-col at-row at-row__direction--column at-row__justify--between'>
                        <Text>{storeInfo.name || ''}</Text>
                        <Text>{`账户余额: ${storeInfo.pirce || 0.00}`}</Text>
                    </View>
                    {/*<View className='at-row at-row__align--center'>*/}
                    {/*<Text className='record' onClick={this.navigateTo.bind(this)}>充值记录</Text>*/}
                    {/*</View>*/}
                </View>
                <View className='menus at-row at-row__direction--column'>
                    <Text className='menu_title'>充值余额</Text>
                    <View className='at-row at-row--wrap'>
                        {
                            rechargeClassify.map((item, index) => {
                                return(
                                    <View className='menu_item at-row at-row__justify--center' key={index}>
                                        <AtTag type='primary' active={selectRecharge.price == item.price} onClick={this.selectRecharge.bind(this, item)}>{item.price}</AtTag>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                <AtButton
                    className='recharge'
                    onClick={this.sureRecharge.bind(this)}
                >
                    确认充值
                </AtButton>
            </View>
        )
    }
}

export default Recharge
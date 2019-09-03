import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import './index.scss'


class Index extends Taro.Component {
    static config = {
        navigationBarTitleText: '购买记录',
    };
    
    render() {
        return(
            <View>
                <View className='at-row at-row__justify--between at-row__align--center item'>
                    <View className='at-row at-row__justify--center at-row__align--center item-left'>
                        <Image className='left-icon'
                            src='http://qiniu.258m.com/xcx-icon.png'
                        />
                    </View>
                    <View className='at-row at-row__direction--column at-row__justify--around at-row__align--start item-right'>
                        <View className='at-row at-row__justify--between item-right-top'>
                            <Text className='title'>奶茶饮品小程序</Text>
                            <Text className='price'>0元</Text>
                        </View>
                        <Text className='time'>购买时间：2019-10-01</Text>
                    </View>
                </View>

                <View className='at-row at-row__justify--between at-row__align--center item'>
                    <View className='at-row at-row__justify--center at-row__align--center item-left'>
                        <Image className='left-icon'
                               src='http://qiniu.258m.com/wx_pay.png'
                        />
                    </View>
                    <View className='at-row at-row__direction--column at-row__justify--around at-row__align--start item-right'>
                        <View className='at-row at-row__justify--between item-right-top'>
                            <Text className='title'>微信支付功能</Text>
                            <Text className='price'>20元</Text>
                        </View>
                        <Text className='time'>购买时间：2019-10-01</Text>
                    </View>
                </View>

                <View className='at-row at-row__justify--between at-row__align--center item'>
                    <View className='at-row at-row__justify--center at-row__align--center item-left'>
                        <Image className='left-icon'
                               src='http://qiniu.258m.com/assemble.png'
                        />
                    </View>
                    <View className='at-row at-row__direction--column at-row__justify--around at-row__align--start item-right'>
                        <View className='at-row at-row__justify--between item-right-top'>
                            <Text className='title'>拼团功能</Text>
                            <Text className='price'>10元</Text>
                        </View>
                        <Text className='time'>购买时间：2019-10-01</Text>
                    </View>
                </View>

            </View>
        )
    }
}

export default Index

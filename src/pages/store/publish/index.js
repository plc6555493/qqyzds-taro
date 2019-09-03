import Taro from '@tarojs/taro';

import './index.scss';
import {Image, Text, View} from "@tarojs/components";

class Manage extends Taro.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <View className='block'>
                <View className="item" style="border-bottom: none">
                    <Text className="item_left">版本管理（当前版本：X1.2.5）</Text>
                </View>

                <View className="item">
                    <Text className="item_left">小程序状态</Text>
                    <View className="item_right">
                        <Text>啊啊啊啊啊啊啊啊</Text>
                    </View>
                </View>

                <View className="item">
                    <Text className="item_left">失败原因</Text>
                    <View className="item_right">
                        <Text style="color: #ff0000;">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</Text>
                    </View>
                </View>

                <View className="item" style="border-bottom: none">
                    <Text className="item_left">提交审核</Text>
                    <View
                        className="item_right"
                        // data-pic={xcx_experience}
                        // onClick={this.showpic}
                    >
                        <Image
                            src={require('../../../image/turn_right.png')}
                            className="arrow_right"
                        />
                        <Text>重新提交</Text>
                    </View>
                </View>
            </View>

        )
    }
}
export default Manage

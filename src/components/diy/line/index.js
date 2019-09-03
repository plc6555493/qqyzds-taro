import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import EditButton from '../editButton';

class Index extends Taro.Component {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        diyitem: {}
    };

    render() {
        const { diyitem } = this.props;
        let data = diyitem.data || [];

        return(
            <View style="background:{{diyitem.style.background}};padding:{{diyitem.style.padding}}rpx 0">
                <View style="border-top:{{diyitem.style.height}}rpx {{diyitem.style.linestyle}} {{diyitem.style.bordercolor}}"></View>
            </View>
        )
    }
}

export default Index
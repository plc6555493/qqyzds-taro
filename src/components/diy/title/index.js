import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import EditButton from '../editButton';

class Index extends Taro.Component {
    static options = {
        addGlobalClass: true
    };
    
    static defaultProps = {
        diyitem: {}
    };

    handleEdit() {
        let { diyitemid } = this.props;
        console.log(diyitemid);
        Taro.navigateTo({url: '/pages/store/diyedit/title/index?diyitemid='+diyitemid});
    }
    
    render() {
        const { diyitem } = this.props;
        return(
            <View className='diy_edit'>
                <EditButton onEdit={this.handleEdit.bind(this)}/>
                <View
                    class="fui-title diypage-title"
                    data-url="{{diyitem.params.link}}"
                    style="background:{{diyitem.style.background}};color:{{diyitem.style.color}};padding:{{diyitem.style.paddingtop}}rpx {{diyitem.style.paddingleft}}rpx;font-size:{{diyitem.style.fontsize}}rpx;text-align:{{diyitem.style.textalign}}"
                >
                    <Text class="icox {{diyitem.params.icon}}"></Text>
                    {(diyitem.params || {}).title || ''}
                </View>
            </View>
        )
    }
}

export default Index

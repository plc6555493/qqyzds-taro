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
        Taro.navigateTo({ url: '/pages/store/diyedit/menu2/index?diyitemid='+diyitemid })
    }
    
    render() {
        const { diyitem } = this.props;
        let data = diyitem.data || [];
        
        return(
            <View className='diy_edit'>
                <EditButton onEdit={this.handleEdit.bind(this)}/>
                <View class="fui-menu-group" style="background:{{diyitem.style.background}};margin-top:{{diyitem.style.margintop==0?0:diyitem.style.margintop+'rpx'}}">
                    {
                        data.map((childitem, index) => {
                            return (
                                <View
                                    key={index}
                                    class="fui-menu-item"
                                    data-phone="{{childitem.phone}}"
                                    data-url="{{childitem.linkurl}}"
                                >
                                    <View class="icox {{childitem.iconclass}}" style="color:{{childitem.iconcolor}};"/>
                                    <Text style="color:{{childitem.textcolor}};">{childitem.text}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

export default Index

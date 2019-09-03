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
        let {diyitemid} = this.props;
        Taro.navigateTo({url: '/pages/store/diyedit/listmenu/index?diyitemid='+diyitemid});
    }
    
    render() {
        const { diyitem } = this.props;
        let data = diyitem.data || [];
        
        return(
            <View className='diy_edit'>
                <EditButton onEdit={this.handleEdit.bind(this)}/>
                <View class="fui-cell-group" style="background-color: {{diyitem.style.background}};margin-top:{{diyitem.style.margintop==0?0:diyitem.style.margintop+'rpx'}}">
                    {
                        data.map((childitem, index) => {
                            return(
                                <View
                                    key={index}
                                    class="fui-cell"
                                    data-appid="{{childitem.appid}}"
                                    data-appurl="{{childitem.appurl}}"
                                    data-phone="{{childitem.phone}}"
                                    data-url="{{childitem.linkurl}}"
                                >
                                    {
                                        childitem.iconclass && (
                                            <View class="fui-cell-icon" style="color:{{diyitem.style.iconcolor}}">
                                                <Text class="icox {{childitem.iconclass}}"></Text>
                                            </View>
                                        )
                                    }
                                    <View class="fui-cell-text" style="color:{{diyitem.style.textcolor}}">{childitem.text || ''}</View>
                                    <View class="fui-cell-remark" style="color:{{diyitem.style.remarkcolor}}">{childitem.remark || ''}</View>
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

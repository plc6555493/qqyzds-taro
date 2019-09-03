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

    handleEdit() {
        let {diyitemid} = this.props;
        Taro.navigateTo({url: '/pages/store/diyedit/icongroup/index?diyitemid='+diyitemid});
    }

    render() {
        const { diyitem } = this.props;
        let data = diyitem.data || [];

        return(
            <View className='diy_edit'>
                <EditButton onEdit={this.handleEdit.bind(this)}/>
                <View className="fui-icon-group noborder col-{{diyitem.params.rownum}}"
                      style="background:{{diyitem.style.background}}">
                    {
                        diyitem.data && diyitem.data.map((item,idx)=>{
                            return(
                                <View className="fui-icon-col"
                                      key={idx}
                                      data-url="{{item.linkurl}}" >

                                    {
                                        item.dotnum>0 &&(
                                            <View className="badge"
                                                  style="background:{{diyitem.style.dotcolor}}" >
                                                {item.dotnum}
                                            </View>
                                        )
                                    }
                                    <View className="icon icon-green radius">
                                        <View className="icox {{item.iconclass}}"
                                              style="color:{{diyitem.style.iconcolor}}"/>
                                    </View>
                                    <View className="text" style="color:{{diyitem.style.textcolor}}">{item.text}</View>
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

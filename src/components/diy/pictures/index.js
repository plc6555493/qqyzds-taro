import Taro from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';

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
        Taro.navigateTo({url: '/pages/store/diyedit/pictures/index?diyitemid='+diyitemid});
    }

    render() {
        const { diyitem } = this.props;
        let data = diyitem.data || [];
        return(
            <View className='diy_edit'>
                <EditButton onEdit={this.handleEdit.bind(this)}/>
                {
                    diyitem.params.showtype == 0 ? (
                        <View className="fui-pictures single row-{{diyitem.params.rownum}}"
                              style="padding:{{diyitem.style.paddingtop*2}}rpx {{diyitem.style.paddingleft*2}}rpx;background:{{diyitem.style.background}};">
                            {
                                diyitem.data && diyitem.data.map((item,idx)=>{
                                    return(
                                        <View
                                            className="item"
                                            data-url="{{item.linkurl}}"
                                            style="padding:10rpx"
                                            key={idx}
                                        >
                                            <View className="image"
                                                  style="text-align:{{diyitem.style.titlealign}};color:{{diyitem.style.titlecolor}}">
                                                <Image mode="widthFix" src="{{item.imgurl}}" />
                                                <View className="title" style="color:{{item.titlecolor}}">{item.title}</View>
                                            </View>
                                            <View className="text"
                                                  style="text-align:{{diyitem.style.textalign}};color:{{diyitem.style.textcolor}}">
                                                {item.text}
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    ):(
                        <View style = "overflow:hidden;white-space:nowrap;padding:{{diyitem.style.paddingtop*2}}rpx {{diyitem.style.paddingleft*2}}rpx;background:{{diyitem.style.background}};">
                            <ScrollView
                                scrollX
                                className = "fui-pictures row-{{diyitem.params.rownum}}" >
                                {
                                    diyitem.data && diyitem.data.map((item,idx)=>{
                                        return(
                                            <View
                                                bindtap = "navigate"
                                                className = "item"
                                                key={idx}
                                                data-url = "{{item.linkurl}}"
                                                style = "padding:10rpx" >
                                                <View className = "image"
                                                      style = "text-align:{{diyitem.style.titlealign}};color:{{diyitem.style.titlecolor}}" >
                                                    <Image mode = "widthFix" src = "{{item.imgurl}}" />
                                                    <View className="title" style="color:{{item.titlecolor}}">
                                                        {item.title}
                                                    </View>
                                                </View>
                                                <View className="text" style="text-align:{{diyitem.style.textalign}};color:{{diyitem.style.textcolor}}">
                                                    {item.text}
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    )
                }
            </View>
        )
    }
}
export default Index

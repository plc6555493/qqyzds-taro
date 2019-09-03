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
        Taro.navigateTo({url: '/pages/store/diyedit/picture/index?diyitemid='+diyitemid});
    }
    
    render() {
        const { diyitem } = this.props;
        let data = diyitem.data || [];
        
        return(
            <View className='diy_edit'>
                <EditButton onEdit={this.handleEdit.bind(this)}/>
                <View class="fui-picture" style="background:{{diyitem.style.background}}">
                    {
                        data.map((childitem, index) => {
                            return(
                                <View
                                    key={index}
                                    data-appid="{{childitem.appid}}"
                                    data-appurl="{{childitem.appurl}}"
                                    data-phone="{{childitem.phone}}"
                                    data-url="{{childitem.linkurl}}"
                                    style="padding:{{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} {{diyitem.style.paddingleft==0?0:diyitem.style.paddingleft+'rpx'}}"
                                >
                                    <Image mode="widthFix"
                                           src="{{childitem.imgurl}}"
                                           style="{{bannerheight?'height:'+bannerheight+'px':'height:auto'}}"
                                    />
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

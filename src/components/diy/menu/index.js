import Taro from '@tarojs/taro';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';

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
        Taro.navigateTo({ url: '/pages/store/diyedit/menu/index?diyitemid='+diyitemid })
    }
    
    render() {
        const { diyitem } = this.props;
        let data = diyitem.data || [];
        let data_temp = diyitem.data_temp || [];
        let style = diyitem.style || {};
        let showtype = style.showtype;
        
        return(
            <View className='diy_edit'>
                <EditButton onEdit={this.handleEdit.bind(this)}/>
                {
                    showtype === '0' && (
                        <View class="fui-icon-group noborder col-{{diyitem.style.rownum}}" style="background:{{diyitem.style.background}}">
                            {
                                data.map(((childitem, index) => {
                                    return(
                                        <View
                                            key={index}
                                            class="fui-icon-col external"
                                            data-appid="{{childitem.appid}}"
                                            data-appurl="{{childitem.appurl}}"
                                            data-phone="{{childitem.phone}}"
                                            data-url="{{childitem.linkurl}}"
                                        >
                                            <View class="icon">
                                                <Image class="{{diyitem.style.navstyle}}" src="{{childitem.imgurl}}"/>
                                            </View>
                                            <View class="text" style="color:{{childitem.color}}">
                                                {childitem.text || ''}
                                            </View>
                                        </View>
                                    )
                                }))
                            }
                        </View>
                    )
                }
                {
                    showtype === '1' && (
                        <Swiper autoplay="true" class="menu" duration="{{500}}" indicatorDots="{{diyitem.style.showdot==1?true:false}}" interval="{{5000}}" style="background:{{diyitem.style.background}};padding:20rpx 0;height:{{diyitem.data_line*160+diyitem.data_line*30}}rpx">
                            {
                                data_temp.map(((childitem, index) => {
                                    return(
                                        <SwiperItem key={index} class="col-{{diyitem.style.rownum}}">
                                            {
                                                childitem.map((menu_item, menu_index) => {
                                                    return (
                                                        <View
                                                            key={menu_index}
                                                            class="fui-icon-col external"
                                                            data-appid="{{menu_item.appid}}"
                                                            data-appurl="{{menu_item.appurl}}"
                                                            data-phone="{{menu_item.phone}}"
                                                            data-url="{{menu_item.linkurl}}"
                                                        >
                                                            <View class="icon">
                                                                <Image class="{{diyitem.style.navstyle}}" src="{{menu_item.imgurl}}"/>
                                                            </View>
                                                            <View class="text" style="color:{{menu_item.color}}">
                                                                {childitem.text || ''}
                                                            </View>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </SwiperItem>
                                    )
                                }))
                            }
                        </Swiper>
                    )
                }
            </View>
        )
    }
}

export default Index

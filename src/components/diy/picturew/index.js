import Taro from '@tarojs/taro';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';

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
        Taro.navigateTo({url: '/pages/store/diyedit/picturew/index?diyitemid='+diyitemid});
    }
    
    render() {
        const { diyitem } = this.props;
        let data = diyitem.data || [];
        let data_temp = diyitem.data_temp || [];
        let params = diyitem.params || {};
        
        return(
            <View className='diy_edit'>
                <EditButton onEdit={this.handleEdit.bind(this)}/>
                {
                    params.row === 1 ? (
                        <View class="fui-cube" style="background:{{diyitem.style.background}};">
                            <View class="fui-cube-left">
                                <View bindtap="navigate" class="navigator" data-appid="{{diyitem.data[0].appid}}" data-appurl="{{diyitem.data[0].appurl}}" data-phone="{{diyitem.data[0].phone}}" data-url="{{diyitem.data[0].linkurl}}" openType="navigate" style="padding:{{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} {{diyitem.style.paddingleft==0?0:diyitem.style.paddingleft+'rpx'}}">
                                    <Image mode="" src="{{diyitem.data[0].imgurl}}"/>
                                </View>
                            </View>
                            <View class="fui-cube-right">
                                {
                                    data.length === 2 && (
                                        <View class="navigator" data-appid="{{diyitem.data[1].appid}}" data-appurl="{{diyitem.data[1].appurl}}" data-phone="{{diyitem.data[1].phone}}" data-url="{{diyitem.data[1].linkurl}}" openType="navigate" style="padding:{{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} {{diyitem.style.paddingleft==0?0:diyitem.style.paddingleft+'rpx'}} {{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} 0;">
                                            <Image mode="" src="{{diyitem.data[1].imgurl}}"/>
                                        </View>
                                    )
                                }
                                {
                                    data.length > 2 && (
                                        <View>
                                            <View class="fui-cube-right1">
                                                <View bindtap="navigate" class="navigator" data-appid="{{diyitem.data[1].appid}}" data-appurl="{{diyitem.data[1].appurl}}" data-phone="{{diyitem.data[1].phone}}" data-url="{{diyitem.data[1].linkurl}}" openType="navigate" style="padding:{{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} {{diyitem.style.paddingleft==0?0:diyitem.style.paddingleft+'rpx'}} 0 0;">
                                                    <Image mode="" src="{{diyitem.data[1].imgurl}}"/>
                                                </View>
                                            </View>
                                            <View class="fui-cube-right2">
                                                {
                                                    data.length === 3 && (
                                                        <View bindtap="navigate" class="navigator" data-appid="{{diyitem.data[2].appid}}" data-appurl="{{diyitem.data[2].appurl}}" data-phone="{{diyitem.data[2].phone}}" data-url="{{diyitem.data[2].linkurl}}" openType="navigate" style="padding:{{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} {{diyitem.style.paddingleft==0?0:diyitem.style.paddingleft+'rpx'}} {{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} 0;">
                                                            <Image mode="" src="{{diyitem.data[2].imgurl}}"/>
                                                        </View>
                                                    )
                                                }
                                                {
                                                    data.length > 3 && (
                                                        <View class="left">
                                                            <View bindtap="navigate" class="navigator" data-appid="{{diyitem.data[2].appid}}" data-appurl="{{diyitem.data[2].appurl}}" data-phone="{{diyitem.data[2].phone}}" data-url="{{diyitem.data[2].linkurl}}" openType="navigate" style="padding:{{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} {{diyitem.style.paddingleft==0?0:diyitem.style.paddingleft+'rpx'}} {{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} 0;">
                                                                <Image mode="" src="{{diyitem.data[2].imgurl}}"/>
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                                {
                                                    data.length == 4 && (
                                                        <View class="right">
                                                            <View bindtap="navigate" class="navigator" data-appid="{{diyitem.data[3].appid}}" data-appurl="{{diyitem.data[3].appurl}}" data-phone="{{diyitem.data[3].phone}}" data-url="{{diyitem.data[3].linkurl}}" openType="navigate" style="padding:{{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} {{diyitem.style.paddingleft==0?0:diyitem.style.paddingleft+'rpx'}} {{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} 0;">
                                                                <Image mode="" src="{{diyitem.data[3].imgurl}}"/>
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                            </View>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    ) : (
                        <View class="fui-picturew row-{{diyitem.params.row}}" style="background:{{diyitem.style.background}}">
                            {
                                params.showtype === 1 ? (
                                    <Swiper duration="{{500}}" interval="{{5000}}" style="background:{{diyitem.style.background}};padding:20rpx 0;">
                                        {
                                            data_temp.map((childitem, index) => {
                                                return(
                                                    <SwiperItem class="fui-picturew" key={index}>
                                                        {
                                                            childitem.map((pic_item, pic_index) => {
                                                                return(
                                                                    <View class="item" key={pic_index}>
                                                                        <View class="navigator" data-appid="{{pic_item.appid}}" data-appurl="{{pic_item.appurl}}" data-phone="{{pic_item.phone}}" data-url="{{pic_item.linkurl=='/pages/commission/index'?'../../commission/pages/index':pic_item.linkurl}}" style="padding:{{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} {{diyitem.style.paddingleft==0?0:diyitem.style.paddingleft+'rpx'}}">
                                                                            <Image class="{{diyitem.style.navstyle}}" mode="widthFix" src="{{pic_item.imgurl}}"/>
                                                                        </View>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </SwiperItem>
                                                )
                                            })
                                        }
                                    </Swiper>
                                ) : (
                                    <View>
                                        {
                                            data.map((childitem, index) => {
                                                return(
                                                    <View class="item" style="padding:{{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} {{diyitem.style.paddingleft==0?0:diyitem.style.paddingleft+'rpx'}};box-sizing:border-box;" key={index}>
                                                        <View bindtap="navigate" class="navigator" data-appid="{{childitem.appid}}" data-phone="{{childitem.phone}}" data-url="{{childitem.linkurl=='/pages/commission/index'?'../../commission/pages/index':childitem.linkurl}}" style="padding:{{diyitem.style.paddingtop==0?0:diyitem.style.paddingtop+'rpx'}} {{diyitem.style.paddingleft==0?0:diyitem.style.paddingleft+'rpx'}}">
                                                            <Image mode="widthFix" src="{{childitem.imgurl}}" style="padding:0;margin:0"/>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                )
                            }
                        </View>
                    )
                }
            </View>
        )
    }
}

export default Index

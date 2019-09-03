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
        Taro.navigateTo({url: '/pages/store/diyedit/banner/index'});
    }
    
    render() {
        const { diyitem, swiperheight, imagesHeight, result, diyitemid } = this.props;
        let data = diyitem.data || [];
        
        return(
            <View className='diy_edit'>
                <EditButton onEdit={this.handleEdit.bind(this)}/>
                {
                    data.length > 1 ? (
                        <View class="index-banner">
                            <Swiper autoplay="true" circular="true" class="index-adcs-sqiper index-banner-sqiper {{diyitem.style.dotstyle}} left" duration="{{500}}" indicatorColor="{{diyitem.style.background}}" indicatorDots="true" interval="{{5000}}" style={result[diyitemid]?'height:'+result[diyitemid]+'px':'height:'+swiperheight+'px'}>
                                {
                                    data.map((childitem, index) => {
                                        return(
                                            <SwiperItem key={index}>
                                                <View bindtap="navigate" class="index-advs-navigator" data-appid="{{childitem.appid}}" data-appurl="{{childitem.appurl}}" data-phone="{{childitem.phone}}" data-url="{{childitem.linkurl}}">
                                                    <Image onLoad={imagesHeight} class="advimg" mode="widthFix" data-type="{{diyitemid}}" src="{{childitem.imgurl}}"/>
                                                </View>
                                            </SwiperItem>
                                        )
                                    })
                                }
                            </Swiper>
                        </View>
                    ) : (
                        <View>
                            {
                                data.map((childitem, index) => {
                                    return(
                                        <View class="index-adcs-sqiper index-banner-sqiper" key={index}>
                                            <View class="index-advs-navigator" data-appid="{{childitem.appid}}" data-appurl="{{childitem.appurl}}" data-phone="{{childitem.phone}}" data-url="{{childitem.linkurl}}">
                                                <Image class="advimg" mode="widthFix" src="{{childitem.imgurl}}"/>
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
}

export default Index
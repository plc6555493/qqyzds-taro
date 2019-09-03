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
        Taro.navigateTo({url: '/pages/store/diyedit/notice/index'})
    }
    
    render() {
        const { diyitem } = this.props;
        let data = diyitem.data || [];
        
        return(
            <View className='diy_edit'>
                <EditButton onEdit={this.handleEdit.bind(this)}/>
                <View class="index-hot">
                    <View class="weui-flex" style="background:{{diyitem.style.background}};">
                        <View class="flex-head-item item-hotdot">
                            <Image class="hotdot" src="{{diyitem.params.iconurl}}"/>
                            <Text class="icox icox-notification notification" style="color:{{diyitem.style.iconcolor}}"/>
                        </View>
                        <View class="weui-flex__item">
                            <Swiper autoplay="true" circular="true" class="index-adcs-sqiper index-notification-swiper" interval="{{diyitem.params.speed}}000" vertical="true">
                                {
                                    data.map((item, idx) => {
                                        return(
                                            <SwiperItem key={idx}>
                                                <View class="notification-navigoter" hoverClass="none" style="color:{{diyitem.style.color}}">
                                                    {item.title || ''}
                                                </View>
                                            </SwiperItem>
                                        )
                                    })
                                }
                            </Swiper>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Index

import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
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
        Taro.navigateTo({url: '/pages/store/diyedit/coupon/index?diyitemid='+diyitemid});
    }

    render(){
        const { diyitem } = this.props;
        let data = diyitem.data || [];

        return(
            <View className="diy-coupon col-{{diyitem.params.couponstyle}} diy_edit"
                  style="background:{{diyitem.style.background}};margin:{{diyitem.style.margintop==0?0:diyitem.style.margintop+'rpx'}} {{diyitem.style.marginleft==0?0:diyitem.style.marginleft+'rpx'}}">
                <EditButton onEdit={this.handleEdit.bind(this)}/>
                {
                    diyitem.data && diyitem.data.map((childitem,index)=>{
                        return(
                            <View className="diy-coupon-item"
                                       key={index}
                                       style="background:{{diyitem.style.background}};padding:{{diyitem.style.margintop==0?0:diyitem.style.margintop+'rpx'}} {{diyitem.style.marginleft==0?0:diyitem.style.marginleft+'rpx'}}"
                                       url={"/pages/sale/coupon/detail/index?id="+childitem.couponid}>
                                <View className="inner" style={{background:childitem.couponcolor}}>
                                    <View className="name">{childitem.price}</View>
                                    <View className="receive">立即领取</View>
                                    <View className="point pointleft" style="background:{{diyitem.style.background}}" />
                                    <View className="point pointright" style="background:{{diyitem.style.background}}" />
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}
export default Index

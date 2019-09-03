import Taro from '@tarojs/taro';
import { View, Block } from '@tarojs/components';

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
        Taro.navigateTo({url: '/pages/store/diyedit/tabbar/index?diyitemid='+diyitemid});
    }

    render() {
        const { diyitem } = this.props;

        return (
            <View>
                {
                    diyitem.id === 'tabbar' && (
                        <block>
                            {
                                ((diyitem.type!='stores'||diyitem.type=='goods')&&diyitem.type!='') && (
                                    <view className="fui-goods-group block" style="background:#f3f3f3">
                                        <view className="fui-goods-item" wx:for="{{diyitem.data[index].data}}">
                                            <navigator className="image {{diyitem.params.showicon=='1'?diyitem.style.iconstyle:''}}"
                                                       data-text="{{diyitem.style.goodsicon}}"
                                                       style="background-image:url({{item.thumb}})"
                                                       url="/pages/goods/detail/index?id={{item.id}}">
                                                <image className="salez"
                                                       src="{{item.total<=0?'/static/images/saleout-2.png':diyitem.params.saleout}}"
                                                       wx:if="{{item.total<=0}}"></image>
                                                <view className="goods-Commission"
                                                      wx:if="{{item.cansee>0&&item.seecommission>0}}">{{item.seetitle}}￥{{
                                                    item
                                                    .seecommission
                                                }}</view>
                                            </navigator>
                                            <view className="detail">
                                                <navigator className="name" style="color:{{diyitem.style.titlecolor}}"
                                                           url="/pages/goods/detail/index?id={{childitem.gid}}">
                                                    <text>{{item.title}}</text>
                                                </navigator>
                                                <view className="price">
                                                    <text className="text" style="color:{{diyitem.style.pricecolor}}">￥{{
                                                        item
                                                        .minprice
                                                    }}</text>
                                                    <navigator url="/pages/goods/detail/index?id={{item.id}}">
                                                        <text bindtap="selectPicker" className="buy buybtnbtn buybtn-1"
                                                              data-buytype="buy" data-id="{{childitem.gid}}"
                                                              style="color:{{diyitem.style.buybtncolor}};border-color:{{diyitem.style.buybtncolor}}">购买
                                                        </text>
                                                    </navigator>
                                                </view>
                                            </view>
                                        </view>

                                        <block wx:if="{{diyitem.status==undefined||diyitem.status==''}}">
                                            <view bindtap="getstoremore" className="getmore" data-id="{{diyitemid}}"
                                                  style="text-align: center;line-height: 72rpx;font-size: 26rpx;color: #999;"
                                                  wx:if="{{diyitem.data[0].showmore!=true&&diyitem.data[0].data.length>0}}">查看更多
                                            </view>
                                        </block>
                                        <block wx:else>
                                            <view bindtap="getstoremore" className="getmore" data-id="{{diyitemid}}"
                                                  style="text-align: center;line-height: 72rpx;font-size: 26rpx;color: #999;"
                                                  wx:if="{{diyitem.data[diyitem.status].showmore!=true&&diyitem.data[diyitem.status].data.length>0}}">查看更多
                                            </view>
                                        </block>

                                    </view>
                                )
                            }

                            <view className="fui-tabbar-content" wx:elif="{{diyitem.type=='stores'}}">
                                <navigator className="tabbar-list" openType="navigate"
                                           url="/pages/order/store/map?id={{item.id}}" wx:for="{{diyitem.data[index].data}}">
                                    <text>{{item.storename}}</text>
                                    <i className="icox icox-dingwei1"></i>
                                </navigator>
                                <block wx:if="{{diyitem.status==undefined||diyitem.status==''}}">
                                    <view bindtap="getstoremore" className="getmore" data-id="{{diyitemid}}"
                                          style="text-align: center;line-height: 72rpx;font-size: 26rpx;color: #999;"
                                          wx:if="{{diyitem.data[0].showmore!=true&&diyitem.data[0].data.length>0}}">查看更多
                                    </view>
                                </block>
                                <block wx:else>
                                    <view bindtap="getstoremore" className="getmore" data-id="{{diyitemid}}"
                                          style="text-align: center;line-height: 72rpx;font-size: 26rpx;color: #999;"
                                          wx:if="{{diyitem.data[diyitem.status].showmore!=true&&diyitem.data[diyitem.status].data.length>0}}">查看更多
                                    </view>
                                </block>
                            </view>
                        </block>
                    )
                }


            </View>
        )
    }
}

export default Index

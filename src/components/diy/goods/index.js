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
        Taro.navigateTo({url: '/pages/store/diyedit/goods/index?diyitemid='+diyitemid});
    }
    
    render() {
        const { diyitem } = this.props;
        let data = diyitem.data || [];
        let data_temp = diyitem.data_temp || [];
        let params = diyitem.params || {};
        let style = diyitem.style || {};
        
        return(
            <View className='diy_edit'>
                <EditButton onEdit={this.handleEdit.bind(this)}/>
                {
                    params.goodsscroll !== 1 && (
                        <View class="fui-goods-group {{diyitem.style.liststyle}}" style="background:{{diyitem.style.background}}">
                            {
                                data.map((childitem, index) => {
                                    return(
                                        <View class="fui-goods-item" key={index}>
                                            <View
                                                class="image {{diyitem.params.showicon=='1'?diyitem.style.iconstyle:''}}"
                                                data-text="{{diyitem.style.goodsicon}}"
                                                style="background-image:url({{diyitem.params.showicon=='2'?diyitem.params.goodsiconsrc:childitem.thumb}})"
                                            >
                                                {
                                                    params.showicon === '2' && (
                                                        <View
                                                            class="goodsicon"
                                                            style="position:relative;width:{{iconwidth}}px;height:{{iconheight}}px"
                                                        >
                                                            {
                                                                params.iconposition === 'left top' && (
                                                                    <Image class="left top" mode="widthFix" src="{{diyitem.params.goodsiconsrc}}" style="width:{{diyitem.style.iconzoom}}%; left:{{diyitem.style.iconpaddingleft}}rpx;top:{{diyitem.style.iconpaddingtop}}rpx"/>
                                                                )
                                                            }
                                                            {
                                                                params.iconposition === 'right top' && (
                                                                    <Image class="right top" mode="widthFix" src="{{diyitem.params.goodsiconsrc}}" style="width:{{diyitem.style.iconzoom}}%; right:{{diyitem.style.iconpaddingleft}}rpx;top:{{diyitem.style.iconpaddingtop}}rpx"/>
                                                                )
                                                            }
                                                            {
                                                                params.iconposition === 'left bottom' && (
                                                                    <Image class="left bottom" mode="widthFix" src="{{diyitem.params.goodsiconsrc}}" style="width:{{diyitem.style.iconzoom}}%; left:{{diyitem.style.iconpaddingleft}}rpx;bottom:{{diyitem.style.iconpaddingtop}}rpx"/>
                                                                )
                                                            }
                                                            {
                                                                params.iconposition === 'right bottom' && (
                                                                    <Image class="right bottom" mode="widthFix" src="{{diyitem.params.goodsiconsrc}}" style="width:{{diyitem.style.iconzoom}}%; right:{{diyitem.style.iconpaddingleft}}rpx;bottom:{{diyitem.style.iconpaddingtop}}rpx"/>
                                                                )
                                                            }
                                                        </View>
                                                    )
                                                }
                                                {
                                                    params.saleout !== -1 && childitem.total === 0 && childitem.cansee <= 0 || params.saleout !== -1 && childitem.total === 0 && childitem.cansee > 0 && childitem.seecommission <= 0 && (
                                                        <Image class="salez" src="{{diyitem.params.saleout==0?'/static/images/saleout-2.png':diyitem.params.saleout}}"/>
                                                    )
                                                }
                                                {
                                                    childitem.cansee > 0 && childitem.seecommission > 0 && (
                                                        <View class="goods-Commission">{`${childitem.seetitle}￥${childitem.seecommission}`}</View>
                                                    )
                                                }
                                            </View>
                                            <View class="detail">
                                                {
                                                    params.showtitle === '1' && (
                                                        <View class="name" style="color:{{diyitem.style.titlecolor}}">
                                                            {
                                                                childitem.bargain > 0 && (
                                                                    <Image class="bargain_label" src="/static/images/label.png"/>
                                                                )
                                                            }
                                                            {
                                                                childitem.ctype === 9 && (
                                                                    <Text class="cycle-tip">周期购</Text>
                                                                )
                                                            }
                                                            <Text>{childitem.title}</Text>
                                                        </View>
                                                    )
                                                }
                                                {
                                                    params.showprice === '1' && (params.showproductprice === '1' || params.showsales === '1') && (
                                                        <View class="productprice">
                                                            {
                                                                childitem.productprice > 0 && params.showproductprice === '1' && (
                                                                    <Text style="color:{{diyitem.style.productpricecolor}};margin-right:16rpx">
                                                                        {params.productpricetext}：<Text class="{{diyitem.params.productpriceline=='1'?'line':''}}">￥{childitem.productprice}</Text>
                                                                    </Text>
                                                                )
                                                            }
                                                            {
                                                                params.showsales === '1' && (
                                                                    <Text style="color:{{diyitem.style.salescolor}}">{params.salestext}：{childitem.sales}</Text>
                                                                )
                                                            }
                                                        </View>
                                                    )
                                                }
                                                {
                                                    params.showprice === '1' && (
                                                        <View class="price">
                                                            <Text class="text" style="color:{{diyitem.style.pricecolor}}">￥{childitem.price}</Text>
                                                            {
                                                                childitem.ctype === 9 && childitem.bargain === 0 && (
                                                                    <View class="buy buybtnbtn buybtn-1" data-buytype="buy" data-id="{{childitem.gid}}" style="">详情</View>
                                                                )
                                                            }
                                                            {
                                                                childitem.ctype === 5 && childitem.bargain === 0 && (
                                                                    <View class="buy buybtnbtn buybtn-1" data-buytype="buy" data-id="{{childitem.gid}}" style="">详情</View>
                                                                )
                                                            }
                                                            {
                                                                childitem.bargain > 0 && (
                                                                    <View class="buy buybtnbtn buybtn-1" data-buytype="buy" data-id="{{childitem.gid}}" style="">砍价</View>
                                                                )
                                                            }
                                                            {
                                                                style.buystyle === 'buybtn-1' && childitem.ctype !== 9 && childitem.ctype !== 5 && (
                                                                    <Text class="buy buybtnbtn {{diyitem.style.buystyle}}" data-buytype="buy" data-home="1" data-id="{{childitem.gid}}" style="color:{{diyitem.style.buybtncolor}};border-color:{{diyitem.style.buybtncolor}}">购买</Text>
                                                                )
                                                            }
                                                            {
                                                                style.buystyle === 'buybtn-2' && childitem.ctype !== 9 && childitem.ctype !== 5 && (
                                                                    <Text class="buy buybtnbtn {{diyitem.style.buystyle}}" data-buytype="buy" data-home="1" data-id="{{childitem.gid}}" style="background:{{diyitem.style.buybtncolor}};border-color:{{diyitem.style.buybtncolor}}">购买</Text>
                                                                )
                                                            }
                                                            {
                                                                style.buystyle === 'buybtn-3' && childitem.ctype !== 9 && childitem.ctype !== 5 && childitem.bargain === 0 && (
                                                                    <Text class="buy icox icox-cartfill buybtnbtn {{diyitem.style.buystyle}}" data-buytype="buy" data-id="{{childitem.gid}}" style="background:{{diyitem.style.buybtncolor}};border-color:{{diyitem.style.buybtncolor}}"/>
                                                                )
                                                            }
                                                            {
                                                                style.buystyle === 'buybtn-4' && childitem.ctype !== 9 && childitem.ctype !== 5 && childitem.bargain === 0 && (
                                                                    <Text class="buy icox icox-gouwuche4 buybtnbtn {{diyitem.style.buystyle}}" data-buytype="buy" data-id="{{childitem.gid}}" style="color:{{diyitem.style.buybtncolor}};"/>
                                                                )
                                                            }
                                                            {
                                                                style.buystyle === 'buybtn-5' && childitem.ctype !== 9 && childitem.ctype !== 5 && childitem.bargain === 0 && (
                                                                    <Text class="buy icox icox-add buybtnbtn {{diyitem.style.buystyle}}" data-buytype="buy" data-id="{{childitem.gid}}" style="color:{{diyitem.style.buybtncolor}};border-color:{{diyitem.style.buybtncolor}}"></Text>
                                                                )
                                                            }
                                                            {
                                                                style.buystyle === 'buybtn-6' && childitem.ctype !== 9 && childitem.ctype !== 5 && childitem.bargain === 0 && (
                                                                    <Text class="buy icox icox-add buybtnbtn {{diyitem.style.buystyle}}" data-buytype="buy" data-id="{{childitem.gid}}" style="background:{{diyitem.style.buybtncolor}};border-color:{{diyitem.style.buybtncolor}}"></Text>
                                                                )
                                                            }
                                                        </View>
                                                    )
                                                }
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                }
                {
                    params.goodsscroll === 1 && (
                        <View class="fui-goods-swiper-group" style="position: relative;">
                            <View class="cut retreat" data-id="{{diyitemid}}" data-num="{{diyitem.data_temp.length}}" data-type="retreat">
                                <View class="icox icox-qianjin-copy-copy"/>
                            </View>
                            {
                                params.goodsscroll === 1 && (
                                    <Swiper
                                        circular="true"
                                        class="swiper fui-goods-group {{diyitem.style.liststyle}} {{diyitem.params.showprice=='1'&&(diyitem.params.showproductprice=='1'||diyitem.params.showsales=='1')?'showproduct':''}} {{diyitem.params.showtitle==1?'showtitle':''}} {{diyitem.params.showprice==1?'showprice':''}}"
                                        current="{{diyitem.current}}"
                                        duration="{{500}}"
                                        interval="{{5000}}"
                                        style="background:{{diyitem.style.background}};"
                                    >
                                        {
                                            data_temp.map((childitem, index) => {
                                                return(
                                                    <SwiperItem
                                                        key={index}
                                                        nextMargin="10px"
                                                    >
                                                        {
                                                            childitem.map((childitems, idx) => {
                                                                return(
                                                                    <View
                                                                        key={idx}
                                                                        class="fui-goods-item">
                                                                        <View class="image {{diyitem.params.showicon=='1'?diyitem.style.iconstyle:''}}" data-text="{{diyitem.style.goodsicon}}" openType="navigate" style="background-image:url({{diyitem.params.showicon=='2'?diyitem.params.goodsiconsrc:childitems.thumb}})">
                                                                            {
                                                                                params.showicon === '2' && (
                                                                                    <View class="goodsicon" style="position:relative;width:{{iconwidth}}px;height:{{iconheight}}px">
                                                                                        {
                                                                                            params.iconposition === 'left top' && (
                                                                                                <Image class="left top" mode="widthFix" src="{{diyitem.params.goodsiconsrc}}" style="width:{{diyitem.style.iconzoom}}%; left:{{diyitem.style.iconpaddingleft}}rpx;top:{{diyitem.style.iconpaddingtop}}rpx"/>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            params.iconposition === 'right top' && (
                                                                                                <Image class="right top" mode="widthFix" src="{{diyitem.params.goodsiconsrc}}" style="width:{{diyitem.style.iconzoom}}%; right:{{diyitem.style.iconpaddingleft}}rpx;top:{{diyitem.style.iconpaddingtop}}rpx"/>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            params.iconposition === 'left bottom' && (
                                                                                                <Image class="left bottom" mode="widthFix" src="{{diyitem.params.goodsiconsrc}}" style="width:{{diyitem.style.iconzoom}}%; left:{{diyitem.style.iconpaddingleft}}rpx;bottom:{{diyitem.style.iconpaddingtop}}rpx"/>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            params.iconposition === 'right bottom' && (
                                                                                                <Image class="right bottom" mode="widthFix" src="{{diyitem.params.goodsiconsrc}}" style="width:{{diyitem.style.iconzoom}}%; right:{{diyitem.style.iconpaddingleft}}rpx;bottom:{{diyitem.style.iconpaddingtop}}rpx"/>
                                                                                            )
                                                                                        }
                                                                                    </View>
                                                                                )
                                                                            }
                                                                            {
                                                                                params.saleout !== -1 && childitem.total === 0 && childitem.cansee <= 0 || params.saleout !== -1 && childitem.total === 0 && childitem.cansee > 0 && childitem.seecommission <= 0 && (
                                                                                    <Image class="salez" src="{{diyitem.params.saleout==0?'/static/images/saleout-2.png':diyitem.params.saleout}}"/>
                                                                                )
                                                                            }
                                                                            {
                                                                                childitem.cansee > 0 && childitem.seecommission > 0 && (
                                                                                    <View class="goods-Commission">{`${childitem.seetitle}￥${childitem.seecommission}`}</View>
                                                                                )
                                                                            }
                                                                        </View>
                                                                        <View class="detail">
                                                                            {
                                                                                params.showtitle === '1' && (
                                                                                    <View class="name" style="color:{{diyitem.style.titlecolor}}">
                                                                                        {childitems.title}
                                                                                    </View>
                                                                                )
                                                                            }
                                                                            {
                                                                                params.showprice === '1' && (params.showproductprice === '1' || params.showsales === '1') && (
                                                                                    <View class="productprice">
                                                                                        {
                                                                                            childitem.productprice > 0 && params.showproductprice === '1' && (
                                                                                                <Text style="color:{{diyitem.style.productpricecolor}};margin-right:16rpx">
                                                                                                    {params.productpricetext}：<Text class="{{diyitem.params.productpriceline=='1'?'line':''}}">￥{childitem.productprice}</Text>
                                                                                                </Text>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            params.showsales === '1' && (
                                                                                                <Text style="color:{{diyitem.style.salescolor}}">{params.salestext}：{childitem.sales}</Text>
                                                                                            )
                                                                                        }
                                                                                    </View>
                                                                                )
                                                                            }
                                                                            {
                                                                                params.showprice === '1' && (
                                                                                    <View class="price">
                                                                                        <Text class="text" style="color:{{diyitem.style.pricecolor}}">￥{childitem.price}</Text>
                                                                                        {
                                                                                            style.buystyle === 'buybtn-1' && (
                                                                                                <Text class="buy buybtnbtn {{diyitem.style.buystyle}}" data-buytype="buy" data-home="1" data-id="{{childitems.gid}}" style="color:{{diyitem.style.buybtncolor}};border-color:{{diyitem.style.buybtncolor}}">购买</Text>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            style.buystyle === 'buybtn-2' && (
                                                                                                <Text class="buy buybtnbtn {{diyitem.style.buystyle}}" data-buytype="buy" data-home="1" data-id="{{childitems.gid}}" style="background:{{diyitem.style.buybtncolor}};border-color:{{diyitem.style.buybtncolor}}">购买</Text>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            style.buystyle === 'buybtn-3' && (
                                                                                                <Text class="buy icox icox-cartfill buybtnbtn {{diyitem.style.buystyle}}" data-buytype="buy" data-id="{{childitems.gid}}" style="background:{{diyitem.style.buybtncolor}};border-color:{{diyitem.style.buybtncolor}}"/>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            style.buystyle === 'buybtn-4' && (
                                                                                                <Text class="buy icox icox-gouwuche4 buybtnbtn {{diyitem.style.buystyle}}" data-buytype="buy" data-id="{{childitems.gid}}" style="color:{{diyitem.style.buybtncolor}};"/>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            style.buystyle === 'buybtn-5' && (
                                                                                                <Text class="buy icox icox-add buybtnbtn {{diyitem.style.buystyle}}" data-buytype="buy" data-id="{{childitems.gid}}" style="color:{{diyitem.style.buybtncolor}};border-color:{{diyitem.style.buybtncolor}}"/>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            style.buystyle === 'buybtn-6' && (
                                                                                                <Text class="buy icox icox-add buybtnbtn {{diyitem.style.buystyle}}" data-buytype="buy" data-id="{{childitems.gid}}" style="background:{{diyitem.style.buybtncolor}};border-color:{{diyitem.style.buybtncolor}}"/>
                                                                                            )
                                                                                        }
                                                                                    </View>
                                                                                )
                                                                            }
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
                                )
                            }
                            <View class="cut advance" data-id="{{diyitemid}}" data-num="{{diyitem.data_temp.length}}" data-type="advance">
                                <View class="icox icox-qianjin-copy"/>
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }
}

export default Index

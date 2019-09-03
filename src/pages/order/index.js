import { Block, View, Image, Text, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const request = require('../../utils/request.js')
var that = null

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    order: [],
    order_status_array: {
      0: '取消',
      10: '未付款',
      20: '已付款',
      30: '已发货',
      40: '已收货',
      50: '已完成（退款）',
      60: '已删除'
    },
    page: 1,
    load_end: false,
    loadding: false
  }
  componentWillMount = (options = this.$router.params || {}) => {
    request.loadPage(this)
  }
  componentDidMount = () => {}
  componentDidShow = () => {
    that = this
    this.getlist(1)
  }
  componentDidHide = () => {}
  componentWillUnmount = () => {}
  onPullDownRefresh = () => {}
  onReachBottom = () => {
    //下拉加载
    this.getlist(++this.data.page)
  }
  getlist = page => {
    //判断是否正在加载或者加载已经完成
    if (this.data.load_end || this.data.loadding) {
      return false
    }

    //当页码为1时，清除前面数据
    if (page == 1) {
      this.setData({ order: [] })
    }
    //设置正在加载中
    this.setData({
      loadding: true
    })
    //加载数据
    request.request('orderList', { curPage: page }, res => {
      let list = res.data.list

      let order = that.data.order
      //循环数据
      for (var i in list) {
        let goods = {}
        goods['goods_title'] = list[i]['goodsInfo'][0]['goods_name'] //商品名称
        goods['goods_pic'] = list[i]['goodsInfo'][0]['goods_image'] //商品图片
        goods['goods_price'] = list[i]['goodsInfo'][0]['goods_price'] //商品单价

        let this_order = {
          goods: goods,
          store_name: list[i]['store_name']
            ? list[i]['store_name']
            : '全球一站电商', //店铺名称
          goods_number: list[i]['goodsInfo'][0]['goods_num'], //数量
          all_price: list[i]['goodsInfo'][0]['goods_price_pay'], //总金额
          order_sn: list[i]['orderDetail']['order_sn'], //订单号
          order_id: list[i]['orderDetail']['order_id'], //订单id
          order_state: list[i]['orderDetail']['order_state'], //订单状态
          order_add_time: list[i]['orderDetail']['order_add_time'], //订单生成时间
          order_payment_time: list[i]['orderDetail']['order_payment_time'] //支付(付款)时间
        }
        order.push(this_order) //添加进入order
      }
      let load_end = list.length == 0 ? true : false //判断是否已经加载完
      that.setData({
        order: order,
        loadding: false,
        this_page: page,
        load_end: load_end
      })
    })
  }
  config = {
    navigationBarTitleText: '订单列表'
  }

  render() {
    const {
      order: order,
      order_status_array: order_status_array,
      btnStyle: btnStyle,
      loadding: loadding,
      load_end: load_end
    } = this.state
    return (
      <View>
        {order.map((item, index) => {
          return (
            <View className="goods_info" key="i">
              <View className="goods_info_title">
                <Image src={require('../../image/store.png')} />
                {item.store_name}
              </View>
              <View className="order_sn">
                {'订单编号：' + item.order_sn}
                <Text style="float: right;color: #ff0000">
                  {order_status_array[item.order_state]
                    ? order_status_array[item.order_state]
                    : '未付款'}
                </Text>
              </View>
              <View className="goods_info_body">
                <View className="goods_info_body_left">
                  <Image src={item.goods.goods_pic} mode="aspectFit" />
                </View>
                <View className="goods_info_body_right">
                  <View className="goods_info_body_right_info">
                    <View className="goods_info_body_right_info_title">
                      {item.goods.goods_title}
                    </View>
                    <View className="goods_info_body_right_info_desc">
                      {item.goods.goods_desc}
                    </View>
                  </View>
                  <View className="goods_info_body_right_price">
                    {'￥' + item.goods.goods_price}
                    <View style="color: #999999;font-size: 25rpx">x 1</View>
                  </View>
                </View>
                <View style="clear: both" />
              </View>
              <View>
                <View style="position: relative">
                  <Navigator
                    url={'/pages/order/detail?order_id=' + item.order_id}
                    className="show_order_button"
                    style={btnStyle}
                  >
                    查看详情
                  </Navigator>
                  <View>
                    <View className="order_add_time">
                      {'下单时间：' + item.order_add_time}
                    </View>
                    <View className="order_pay_time">
                      {item.order_payment_time && (
                        <View>{'支付时间：' + item.order_payment_time}</View>
                      )}
                    </View>
                  </View>
                </View>
                <View style="clear: both" />
              </View>
            </View>
          )
        })}
        {loadding && <View className="load_more_pic">正在加载中...</View>}
        {load_end && <View className="load_end">已加载完成</View>}
      </View>
    )
  }
}

export default _C

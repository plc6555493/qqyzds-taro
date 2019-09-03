import Taro from '@tarojs/taro';
import {View,Button} from "@tarojs/components";
import {AtDrawer} from 'taro-ui';
import './index.scss'

class AddApplication extends Taro.Component {
    constructor(props){
        super(props);
        this.state = {
            application:[
                {
                    name:'人人分销',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/commission.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'积分商城',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/creditshop.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'人人拼团',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/groups.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'全民股东',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/globonus.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'多商户',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/merch.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'区域代理',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/abonus.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'收银台',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/cashier.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'快速购买',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/quick.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'游戏营销',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/lottery.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'小程序',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/app.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'周期购',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/cycelbuy.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'团队分红',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/dividend.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'人人分销',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/commission.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'积分商城',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/creditshop.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'人人拼团',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/groups.jpg',
                    introduce:'一个好应用',
                },
                {
                    name:'全民股东',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/globonus.jpg',
                    introduce:'一个好应用',
                },
            ]
        }
    }

    handleClosed() {
        this.props.handleClosed()
    }

    buy(index) {
        this.props.buy(index)
    }

    render() {
        const {application} = this.state;
        const {showAppShop} = this.props;
        return(
            <View>
                <AtDrawer className='drawer'
                          show={showAppShop}
                          left
                          mask
                          onClose={this.handleClosed.bind(this)}
                >
                    <View className='drawer-item'>
                        <View className='title'>应用列表</View>
                        <View>
                            {
                                application && application.map((item,index)=>{
                                    return(
                                        <View className='list' key={index}>
                                            <View className='left'>
                                                <Image
                                                    className='pic'
                                                    src={item.icon}
                                                />
                                                <View className='txt'>
                                                    <Text className='name'>{item.name}</Text>
                                                    <Text className='time'>{item.introduce}</Text>
                                                </View>
                                            </View>

                                            <View>
                                              <Button className='buy'
                                                      onClick={this.buy.bind(this,index)}
                                              >
                                                  购买
                                              </Button>
                                            </View>
                                        </View>
                                    )
                                })
                            }

                        </View>
                    </View>
                </AtDrawer>
            </View>
        )
    }
}
export default AddApplication

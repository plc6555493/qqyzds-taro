import Taro from '@tarojs/taro';
import {View} from "@tarojs/components";

import './index.scss';

class GetTemplate extends Taro.Component {
    constructor(props) {
        super(props);
        this.state = {
            cost:true,
            free:false,
            current_menu:{},
            menu:{
                public:[
                    {
                        title:'微信收款',
                        icon:'collected_money'
                    },
                    {
                        title:'充值',
                        icon:'recharge'
                    },
                    {
                        title:'分享',
                        icon:'share'
                    },
                    {
                        title:'用户管理',
                        icon:'customer'
                    },
                    {
                        title:'收银一体化',
                        icon:'cashier'
                    },
                    {
                        title:'拼团',
                        icon:'group_buy'
                    },
                    {
                        title:'秒杀',
                        icon:'seckill'
                    },
                    {
                        title:'会员',
                        icon:'member'
                    },
                    {
                        title:'预售',
                        icon:'advanced_sale'
                    },
                    {
                        title:'快递',
                        icon:'fast_mail'
                    },
                ],
                specific:[
                    {
                        id:1001,
                        menu:[

                        ]
                    },
                    {
                        id:1002,
                        sub_id:[
                            {
                                id:2201,
                                menu:[

                                ]
                            },
                            {
                                id:2202,
                                menu:[

                                ]
                            },
                            {
                                id:2203,
                                menu:[

                                ]
                            },
                            {
                                id:2204,
                                menu:[]
                            },
                            {
                                id:2205,
                                menu:[]
                            },
                            {
                                id:2206,
                                menu:[]
                            },
                            {
                                id:2207,
                                menu:[]
                            },
                            {
                                id:2208,
                                menu:[]
                            },
                            {
                                id:2209,
                                menu:[]
                            },
                            {
                                id:2210,
                                menu:[]
                            },
                            {
                                id:2211,
                                menu:[]
                            },
                            {
                                id:2212,
                                menu:[]
                            },
                            {
                                id:2213,
                                menu:[]
                            },
                            {
                                id:2214,
                                menu:[]
                            },
                            {
                                id:2215,
                                menu:[]
                            },
                        ]
                    },
                    {
                        id:1003,//美业
                        sub_id:[
                            {
                                id:2301,
                                menu:[
                                    {
                                        title:'预约',
                                        icon:'appointment'
                                    },
                                ]
                            },
                            {
                                id:2302,
                                menu:[
                                    {
                                        title:'预约',
                                        icon:'appointment'
                                    },
                                ]
                            },
                            {
                                id:2303,
                                menu:[
                                    {
                                        title:'预约',
                                        icon:'appointment'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        id:1004,//餐饮外卖
                        sub_id:[
                            {
                                id:2401,
                                menu:[
                                    {
                                        title:'外卖',
                                        icon:'waimai'
                                    },
                                ]
                            },
                            {
                                id:2402,
                                menu:[
                                    {
                                        title:'外卖',
                                        icon:'waimai'
                                    },
                                ]
                            },
                            {
                                id:2403,
                                menu:[
                                    {
                                        title:'外卖',
                                        icon:'waimai'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        id:1005,
                        menu:[

                        ]
                    },
                    {
                        id:1006,
                        sub_id:[
                            {
                                id:2601,
                                menu:[]
                            },
                            {
                                id:2602,
                                menu:[]
                            },
                        ]
                    },
                    {
                        id:1007,
                        menu:[

                        ]
                    },
                    {
                        id:1008,
                        sub_id:[
                            {
                                id:2801,
                                menu:[]
                            },
                            {
                                id:2802,
                                menu:[]
                            },
                        ]
                    },

                ]
            },
            menu1:[
                {
                    title:'充值',
                    icon:'recharge'
                },
                {
                    title:'微信收款',
                    icon:'collected_money'
                },
                {
                    title:'会员',
                    icon:'member'
                },
                {
                    title:'拼团',
                    icon:'group_buy'
                },
                {
                    title:'秒杀',
                    icon:'seckill'
                },
                {
                    title:'分享',
                    icon:'share'
                },
                {
                    title:'预售',
                    icon:'advanced_sale'
                },
                {
                    title:'用户管理',
                    icon:'customer'
                },
                {
                    title:'收银一体化',
                    icon:'cashier'
                },
                {
                    title:'快递',
                    icon:'fast_mail'
                },
            ],
            menu2:[
                {
                    title:'货到付款',
                    icon:'wait_pay'
                },
                {
                    title:'电商功能',
                    icon:'cart'
                },
                {
                    title:'商品',
                    icon:'goods'
                },
                {
                    title:'用户管理',
                    icon:'customer'
                },
                {
                    title:'客服',
                    icon:'customer_service'
                },
            ]
        };

    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { template_id } = this.props;
        const { menu } = this.state;
        menu.specific.map((item,index)=>{
            if ( !item.sub_id ) {
                if ( item.id == template_id ) {
                    let current_menu = menu.public.concat(item.menu || []);
                    this.setState({current_menu:current_menu});
                }
            } else {
                item.sub_id.map((item1,index1)=>{
                    if ( item1.id == template_id ) {
                        let current_menu = menu.public.concat(item1.menu || []);
                        this.setState({current_menu:current_menu});
                    }
                })
            }
        })
    }

    stopClick ( e ) {
        e.stopPropagation();
        this.props.closeBuy();
    }

    stopClick2 ( e ) {
        e.stopPropagation();
    }

    checkCost () {
        this.setState({cost:true,free:false})
    }

    checkFree () {
        this.setState({cost:false,free:true})
    }

    getTemplate () {
        this.props.getTemplate()
    }

    render() {
        const { current_menu, menu1, menu2, cost, free } = this.state;
        let { isShow } = this.props;
        return (
            isShow && (
                // 蒙版
                <View className='mask' onClick={this.stopClick.bind(this)}>
                    {/*整个购买界面*/}
                    <View className='cost' onClick={this.stopClick2.bind(this)}>

                        <View className='drawer'>
                            {/*顶部图片*/}
                            <View className='head'>
                                <Image
                                    className='img'
                                    mode='widthFix'
                                    src={`http://qiniu.258m.com/${cost?'costs':'free'}.png`}
                                />
                                {/*开通*/}
                                <View className='get' onClick={this.getTemplate.bind(this)}/>
                            </View>
                            {/*菜单*/}
                            <View className='body'>
                                {
                                    // 收费
                                    (cost && current_menu) && current_menu.map((item, index) => {
                                        return (
                                            <View className='menu' key={index}>
                                                <View className='icon'>
                                                    <Image className='img'
                                                           src={`http://qiniu.258m.com/${item.icon}.png`}
                                                    />
                                                </View>
                                                <View className='title'>
                                                    {item.title}
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                                {
                                    // 免费
                                    (free && menu2) && menu2.map( (item,index) => {
                                        return (
                                            <View className='menu' key={index}>
                                                <View className='icon'>
                                                    <Image className='img'
                                                           src={`http://qiniu.258m.com/${item.icon}.png`}
                                                    />
                                                </View>
                                                <View className='title'>
                                                    {item.title}
                                                </View>
                                            </View>
                                        )
                                    } )
                                }
                            </View>
                            {/*选择套餐*/}
                            <View className='foot'>
                                <View className='btn'
                                      style={cost ? {backgroundColor:'#f5222d',color:'#fff'} : {backgroundColor:'#ddd',color:'#333'}}
                                      onClick={this.checkCost.bind(this)}
                                >
                                    开通套餐版
                                </View>
                                <View className='btn'
                                      style={free ? {backgroundColor:'#f5222d',color:'#fff'} : {backgroundColor:'#ddd',color:'#333'}}
                                      onClick={this.checkFree.bind(this)}
                                >
                                    开通免费版
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
            )
        )
    }
}

export default GetTemplate

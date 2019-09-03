import { View, Button, Text, Navigator } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

export default class Purchase extends Taro.Component {
    
    static options = {
        addGlobalClass: true
    };
    
    constructor(props){
        super(props);
        this.state={
            data:{
                drawer:{
                    head: '在线支付',
                    body:[
                        {
                            type:'试用版',
                            price:'100.00'
                        },
                        {
                            type:'3个月（不含微信支付）',
                            price:'270.00'
                        },
                        {
                            type:'12个月（送微信支付）',
                            price:'720.00'
                        }
                    ],
                    foot:'《世界之窗服务协议》'
                },
            }
        }
    }



    handleClosed() {
       this.props.handleClosed()
    }

    closeMask(e) {
        this.props.closeMask();
        e.stopPropagation()
    }

    stopClick(e) {
        e.stopPropagation()
    }

    toPageAgreement() {
        Taro.navigateTo({
            url:'/pages/agreement/index'
        })
    }

    ClickPurchase(index) {
        console.log('点击购买'+index);
    }

    render(){
        const { data } = this.state;
        const { show } = this.props;
        return(
            <View className='purchase'>
                {/*抽屉*/}
                {
                    show === true && (
                        <View className='mask'
                              onClick={this.closeMask}
                        >
                            <View className={
                                'drawer '
                                // +( show === true ? 'drawer-show' : '' )
                            }
                                  onClick={this.stopClick}
                            >
                                <View className='head'>
                                    {data.drawer.head}
                                </View>
                                <View className='at-row at-row__direction--column body'>
                                    {
                                        data.drawer.body&& data.drawer.body.map((item,index)=>{
                                            return(
                                                <View taroKey={index} className='view'>
                                                    <Text>{item.type}</Text>
                                                    <View className='at-row at-row__align--center'>
                                                        <Text>{'￥'+item.price}</Text>
                                                        <Button onClick={this.ClickPurchase.bind(this,index)}>
                                                            购买
                                                        </Button>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View className='foot'>
                                    <View>
                                        <Text onClick={this.toPageAgreement.bind(this)}>
                                            {data.drawer.foot}
                                        </Text>
                                    </View>
                                    <Button onClick={this.handleClosed.bind(this)}>取消</Button>
                                </View>
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }
}
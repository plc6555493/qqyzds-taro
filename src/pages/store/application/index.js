import Taro from '@tarojs/taro';
import {View} from "@tarojs/components";
import { AtSwitch, AtButton } from 'taro-ui';
import './index.scss'

import AddApplication from '../../../components/addApplication'

class Application extends Taro.Component {
    static config = {
        navigationBarTitleText: '应用商店',
    };

    constructor(props) {
        super(props);
        this.state = {
            showAppShop:false,
            application:[
                {
                    name:'人人分销',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/commission.jpg',
                    time:20,
                    checked:false
                },
                {
                    name:'积分商城',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/creditshop.jpg',
                    time:20,
                    checked:false
                },
                {
                    name:'人人拼团',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/groups.jpg',
                    time:20,
                    checked:false
                },
                {
                    name:'全民股东',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/globonus.jpg',
                    time:20,
                    checked:false
                },
                {
                    name:'全民股东',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/globonus.jpg',
                    time:20,
                    checked:false
                },
                {
                    name:'全民股东',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/globonus.jpg',
                    time:20,
                    checked:false
                },
                {
                    name:'全民股东',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/globonus.jpg',
                    time:20,
                    checked:false
                },
                {
                    name:'全民股东',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/globonus.jpg',
                    time:20,
                    checked:false
                },
                {
                    name:'全民股东',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/globonus.jpg',
                    time:20,
                    checked:false
                },
                {
                    name:'全民股东',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/globonus.jpg',
                    time:20,
                    checked:false
                },
                {
                    name:'全民股东',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/globonus.jpg',
                    time:20,
                    checked:false
                },
                {
                    name:'全民股东',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/globonus.jpg',
                    time:20,
                    checked:false
                },
                {
                    name:'全民股东',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/globonus.jpg',
                    time:20,
                    checked:false
                },
                {
                    name:'全民股东',
                    icon:'https://biz.258m.com/addons/ewei_shopv2/static/images/globonus.jpg',
                    time:20,
                    checked:false
                },
            ]
        }

    }

    handleChecked( index, e ) {
        console.log(index, e);
        let {application} = this.state;
        application[index].checked = e;
        this.setState({application})
    }

    addApp() {
        this.setState({showAppShop:true})
    }

    handleClosed() {
        this.setState({showAppShop:false})
    }

    buy(index) {
        console.log(index);
    }

    render() {
        const {application,showAppShop} = this.state;
        return(
            <View className='index'>
                <View className='back'>
                    <AddApplication
                        showAppShop={showAppShop}
                        handleClosed={this.handleClosed.bind(this)}
                        buy={this.buy.bind(this)}
                    />
                    {
                        application && application.map((item,index)=>{
                            return(
                                <View className='at-row at-row__justify--around at-row__align--center list' key={index}>
                                    <View className='at-row at-row__justify--around at-col-4 left'>
                                        <Image
                                            className='pic'
                                            src={item.icon}
                                        />
                                        <View className='at-row at-row__direction--column at-row__justify--between at-row__align--start txt'>
                                            <Text className='name'>{item.name}</Text>
                                            <Text className='time'>剩余<Text className='time-color'>{item.time}</Text>天</Text>
                                        </View>
                                    </View>

                                    <View className='at-row at-row__justify--end at-col-6'>
                                        <AtSwitch
                                            className='switch'
                                            checked={item.checked}
                                            color='#07c160'
                                            onChange={this.handleChecked.bind(this,index)}
                                        />
                                    </View>
                                </View>
                            )
                        })
                    }
                    <AtButton
                        className='save add-app'
                        full
                        onClick={this.addApp.bind(this)}
                    >
                        添加应用
                    </AtButton>
                </View>
            </View>
        )
    }
}

export default Application;

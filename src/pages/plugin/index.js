import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

class Index extends Taro.Component {
    static config = {
        navigationBarTitleText: '应用中心',
    };
    
    constructor(props) {
        super(props);
        this.state = {
            plugins: [
                {
                    label: '分销', icon: 'https://biz.258m.com/web/index.php?c=site&a=entry&m=ewei_shopv2&do=web&r=commission'
                },
                {
                    label: '拼团', icon: 'https://biz.258m.com/web/index.php?c=site&a=entry&m=ewei_shopv2&do=web&r=groups'
                },
                {
                    label: '秒杀', icon: 'https://biz.258m.com/web/index.php?c=site&a=entry&m=ewei_shopv2&do=web&r=seckill'
                },
                {
                    label: '会员卡', icon: 'https://biz.258m.com/web/index.php?c=site&a=entry&m=ewei_shopv2&do=web&r=membercard'
                },
                {
                    label: '积分签到', icon: 'https://biz.258m.com/web/index.php?c=site&a=entry&m=ewei_shopv2&do=web&r=sign'
                },
                {
                    label: '砍价活动', icon: 'https://biz.258m.com/web/index.php?c=site&a=entry&m=ewei_shopv2&do=web&r=bargain'
                },
                {
                    label: '微信支付', icon: 'https://biz.258m.com/web/index.php?c=site&a=entry&m=ewei_shopv2&do=web&r=bargain'
                }
            ]
        }
    }
    
    render() {
        const { plugins } = this.state;
        
        return(
            <View>
            
            </View>
        )
    }
}

export default Index
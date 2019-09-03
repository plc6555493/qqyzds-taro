import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui';

import './index.scss';

class Info extends Taro.Component {
    static config = {
        navigationBarTitleText: '小程序信息'
    }
    
    constructor(props) {
        super(props);
        let params = this.$router.params || {};
        this.state = {
            verify_name: {
                '-1': '未认证',
                '0': '微信认证',
                '1': '新浪微博认证',
                '2': '腾讯微博认证',
                '3': '已资质认证通过但还未通过名称认证',
                '4': '已资质认证通过、还未通过名称认证，但通过了新浪微博认证',
                '5': '已资质认证通过、还未通过名称认证，但通过了腾讯微博认证'
            }
        }
    }
    
    navigateTo(path, params) {
        path && Taro.navigateTo({url: path});
    }
    
    render() {
        const {} = this.state;
        const { store } = this.props;
        
        return (
            <View className="container">
                <View className="paper">
                    <View className="item" onClick={this.navigateTo.bind(this, '/pages/store/headimage/index')}>
                        <Text className="item_left">小程序头像</Text>
                        <View className="item_right">
                            <Image className="headimage" src={store.imgUrl || ''} mode="aspectFill"/>
                            <AtIcon value='chevron-right' size='18' color='#999'/>
                        </View>
                    </View>
                    <View className="item" onClick={this.navigateTo.bind(this, '/pages/store/nickname/index')}>
                        <Text className="item_left">小程序名称</Text>
                        <View className="item_right">
                            <Text>{store.name || ''}</Text>
                            <AtIcon value='chevron-right' size='18' color='#999'/>
                        </View>
                    </View>
                    <View className="item" onClick={this.navigateTo.bind(this, '/pages/store/signature/index')}>
                        <View className="item_left">小程序简介</View>
                        <View className="item_right">
                            <Text>{store.signature || ''}</Text>
                            <AtIcon value='chevron-right' size='18' color='#999'/>
                        </View>
                    </View>
                    <View className="item">
                        <View className="item_left">微信认证</View>
                        <View className="item_right">
                            <Text>已认证</Text>
                        </View>
                    </View>
                    <View className="item">
                        <View className="item_left">授权状态</View>
                        <View className="item_right">
                            <Text>已授权</Text>
                        </View>
                    </View>
                    <View className="item">
                        <View className="item_left">APPID</View>
                        <View className="item_right">
                            <Text>{store.appid || ''}</Text>
                        </View>
                    </View>
                    <View className="item" style="border-bottom: none">
                        <View className="item_left">服务类目</View>
                        <View className="item_right">
                            <Text>查看</Text>
                            <AtIcon value='chevron-right' size='18' color='#999'/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        store: state.store || {}
    }
};

export default connect(mapStateToProps)(Info)

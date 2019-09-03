import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtNoticebar } from 'taro-ui';

import './index.scss';

class QRCode extends Taro.Component {
    static config = {
        navigationBarTitleText: '小程序二维码',
    };
    
    constructor(props) {
        super(props);
        let params = this.$router.params || {};
        let wx_min_code = params.wx_min_code || 'https://upload.258m.com/wx_min/page_index/qrcode_wx2538f8f0d2cd7136.jpg';
        let wx_min_code_exp = params.wx_min_code_exp || 'https://upload.258m.com/wx_min/qrcode_exp/1123/qrcode_exp_.jpg?v=1564016862';
    
        this.state = {
            wx_min_code: wx_min_code,
            wx_min_code_exp: wx_min_code_exp
        }
    }
    
    previewImage(url) {
        Taro.previewImage({current: url, urls: [url]});
    }
    
    render() {
        const { wx_min_code, wx_min_code_exp } = this.state;
        return(
            <View className='container'>
                <AtNoticebar>[提示]点击二维码浏览保存到手机相册，在微信入口处使用二维码扫描即可打开二维码中的小程序。正式版二维码需要发布审核之后才能使用。未获得体验权限的用户无法使用体验版二维码。</AtNoticebar>
                <View className='qrcode at-row'>
                    <View className='qrcode_item at-row at-row__justify--center at-row__align--center at-row__direction--column'>
                        <Image src={wx_min_code} onClick={this.previewImage.bind(this, wx_min_code)}/>
                        <Text>正式版二维码</Text>
                    </View>
                    <View className='qrcode_item at-row at-row__justify--center at-row__align--center at-row__direction--column'>
                        <Image src={wx_min_code_exp} onClick={this.previewImage.bind(this, wx_min_code_exp)}/>
                        <Text>体验版二维码</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default QRCode
import Taro from '@tarojs/taro';
import { Provider }  from '@tarojs/redux';

import './app.scss';

import Index from './pages/index';

import { checkVersion } from './utils';
import { updateSystem } from './reducers';
import configStore from "./store";

import '@tarojs/async-await';
import 'weapp-cookie/dist/weapp-cookie';
const store = configStore();

class App extends Taro.Component {
  
    config = {
        pages: [
            'pages/index/index',
            'pages/template/list/index',
            'pages/template/detail/index',
            
            'pages/store/index',
            'pages/store/info/index',
            'pages/store/register/index',
            'pages/store/auth/index',
            'pages/store/qrcode/index',
            'pages/store/pay/index',
            'pages/store/experience/index',
            'pages/store/headimage/index',
            'pages/store/nickname/index',
            'pages/store/signature/index',
            'pages/store/publish/index',
            'pages/store/buyrecord/index',
            'pages/store/recharge/index',
            'pages/store/application/index',
            // 'pages/store/courses/index',

            'pages/store/index1',
            'pages/store/diy/index',
            'pages/store/diyedit/banner/index'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#f5222d',
            navigationBarTitleText: '全球一站电商',
            navigationBarTextStyle: 'white'
        },
        navigateToMiniProgramAppIdList: [
            'wx1601259bf4183a65',
            'wx01b4d6ed1c6090aa',
            'wx37ba8921b0a28867'
        ],
        permission: {
            'scope.userLocation': {
                desc: '你的位置信息将用于小程序位置接口的效果展示'
            }
        }
    };
    
    globalData = {
        user_version: '0.0.81'
    };
    
    componentWillMount() {
        this.$app.globalData = this.globalData
    }
    
    componentDidMount() {
        this.initApp();
    }
    
    initApp() {
        Taro.setStorageSync('mainColor', {data: 'f5222d'});
        
        Taro.getSetting().then((res) => {
            if (!res.authSetting['scope.userLocation']) {
                Taro.authorize({scope: 'scope.userLocation'});
            }
        });
        
        Taro.getSystemInfo().then((res) => {
            let system = res || {};
            if (system.model.search('iPhone X') != -1) {
                system.isphoneX = true;
            }
            store.dispatch(updateSystem(system));
        });
    
        checkVersion();
    }
    
    render() {
        return (
            <Provider store={store}>
              <Index/>
            </Provider>
        )　
    }
}

Taro.render(<App />, document.getElementById('app'));

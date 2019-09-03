import Taro from '@tarojs/taro';
import { post } from '../service/request';

//充值
const recharge = () => {
    return post('getOrderPay').then((res) => {
        let data = res.data || {};
    
        Taro.requestPayment({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': 'MD5',
            'paySign': data.paySign,
            'success': function (res) {
                if (res.errMsg == "requestPayment:ok") {
                    wnwShowToast("支付成功");
                
                } else if (res.errMsg == "requestPayment:fail cancel") {
                    wnwShowToast("您已经取消支付");
                } else {
                    wnwShowToast("支付失败");
                }
                wnwRedirectTo("/pages/com/orderStateDetail/index?oid=" + oid)
            },
            'fail': function (res) {
                wnwShowToast("支付失败");
                wnwRedirectTo("/pages/com/orderStateDetail/index?oid=" + oid)
            }
        }).then((res) => {
            if (res.errMsg == "requestPayment:ok") {
                return Promise.resolve();
            } else if (res.errMsg == "requestPayment:fail cancel") {
                return Promise.reject(new Error('cancel'));
            } else {
                return Promise.reject(new Error('error'));
            }
        });
    });
};

export default {
    recharge
}
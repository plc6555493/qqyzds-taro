import Taro from '@tarojs/taro';
import { post, upload } from '../service/request';

//上传营业执照信息
const uploadBusinessLicense = (filePath,name,type) => {
    return upload('businessLicense', {
        filePath: filePath,
        name: name,
        type: type
    }).then((res) => {
        if (res.state) {
            return Promise.resolve(JSON.parse(res.data || '{}'));
        } else {
            return Promise.reject(new Error(res.msg));
        }
    })
};

//上传身份证信息
const uploadIdCard = (filePath,name,type) => {
    return upload('IdCard', {
        filePath: filePath,
        name: name,
        type: type
    }).then((res) => {
        if (res.state) {
            return Promise.resolve(JSON.parse(res.data || '{}'));
        } else {
            return Promise.reject(new Error(res.msg));
        }
    })
};

//注册小程序
const registerWeapp = (params = {}) => {
    let openid = Taro.getStorageSync('userinfo_openid');
    return post('api/api.php?platform=mini.program&r=MiniProgram.component.register', {
        openid: openid,
        ...params
    }).then((res) => {
        if (res.state) {
            return Promise.resolve(res.data || {});
        } else {
            return Promise.reject(new Error(res.msg));
        }
    });
};

export default {
    uploadBusinessLicense,
    uploadIdCard,
    registerWeapp
}
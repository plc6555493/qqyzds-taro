import { post } from '../service/request';

//微信登录
const wxLogin = (code) => {
    return post('api/api.php?platform=mini.program&r=MiniProgram.index.auth', {code: code}).then((res) => {
        if (res.state) {
            return Promise.resolve(res.data || {});
        } else {
            return Promise.reject(new Error(res.msg));
        }
    });
};

//微信授权绑定手机号
const wxBindPhone = (params) => {
    return post('hii/wxBindPhone', params).then((res) => {
        if (res.state) {
            return Promise.resolve(res.data || {});
        } else {
            return Promise.reject(new Error(res.msg));
        }
    });
};

//手机号密码登录
const login = (phone, password) => {
    return post('login', {
        username: phone,
        password: password,
        platform: 'platform'
    }).then((res) => {
        if (res.state) {
            return Promise.resolve(res.data || {});
        } else {
            return Promise.reject(new Error(res.msg));
        }
    });
};

export default {
    wxLogin,
    wxBindPhone,
    login
}
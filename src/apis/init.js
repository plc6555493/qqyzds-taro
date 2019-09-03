import { post } from '../service/request';

//获取初始化app信息
const initApp = () => {
    return post('initApp').then((res) => {
        if (res.state) {
            return Promise.resolve(res.data || {});
        } else {
            return Promise.reject(new Error(res.msg));
        }
    });
};

export default {
    initApp
}
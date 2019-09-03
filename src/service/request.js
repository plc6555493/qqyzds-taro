import Taro from "@tarojs/taro";
import _ from 'utilscore/dist/index';
import BASE_URL from "./config";
import interceptors from "./interceptors";

interceptors.forEach(i => Taro.addInterceptor(i));

const defultHandles = {
    loading: false
};

const requestConfig = (options = {}) => {
    let handles = _.deepClone(defultHandles);
    !_.isUndefined(options.loading)&&(handles.loading = options.loading);
    
    return Promise.resolve().then(() => {
        let token = Taro.getStorageSync('token');
        let needAuth = !_.isUndefined(options.needAuth) ? options.needAuth : true;
        let config = {
            data: options.data || {},
            method: options.method || 'GET',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                ...(options.header || {})
            }
        };
        
        if (token&&needAuth) {
            config.data.token = token;
        }
        
        if (Taro.getEnv() != 'WEAPP') {
            config.data._KEY = 'YuMV1vSh1WALTem4s';
        }
        
        return Promise.resolve({
            config: config,
            handles: handles
        });
    });
};

const customRequest = (config) => {
    return Taro.request(config);
};

const request = (options) => {
    return requestConfig(options).then(({config, handles}) => {
        let { url } = options;
        config.url = BASE_URL + url;
        return Taro.request(config);
    });
};

const get = (url, data) => {
    let options = { url, data };
    return request(options);
};

const post = (url, data) => {
    let options = { url, data };
    return request({...options, method: 'POST'});
};

const put = (url, data) => {
    let options = { url, data };
    return request({...options, method: 'PUT'});
};

const del = (url, data) => {
    let options = { url, data };
    return request({...options, method: 'DELETE'});
};

const upload = (data) => {
    //let token = Taro.getStorageSync('token');
    //let formData = {
    //    token: token
    //};
    //data.type && (formData.type = data.type);
    //data.typeUpload && (formData.typeUpload = data.typeUpload);
    
    let config = {
        url: BASE_URL + 'app/ewei_shopv2_api.php?i=6&r=util.uploader.upload',
        filePath: data.filePath || '',
        name: 'file'
    };
    
    return Taro.uploadFile(config).then((res) => {
        return Promise.resolve(JSON.parse(res.data || {}));
    });
};

//多个文件上传
const multipleUpload = (datas) => {
    let promises = [];
    datas.map((item) => {
        promises.push(upload(item));
    });
    return Promise.all(promises);
};

export {
    customRequest,
    request,
    get,
    post,
    put,
    del,
    upload,
    multipleUpload
};

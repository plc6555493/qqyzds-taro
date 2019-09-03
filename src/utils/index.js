import Taro from '@tarojs/taro';

//检查小程序版本更新
const checkVersion = () => {
    if (Taro.getEnv() !== 'WEAPP') {
        return
    }
    
    if (Taro.canIUse('getUpdateManager')) {
        const manager = Taro.getUpdateManager();
        manager.onCheckForUpdate((res) => {
            if (res.hasUpdate) {
                manager.onUpdateReady(() => {
                    Taro.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？'
                    }).then((res) => {
                        if (res.confirm) {
                            manager.applyUpdate();
                        }
                    });
                });
                manager.onUpdateFailed(() => {
                    Taro.showModal({
                        title: '已经有新版本了哟~',
                        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                    });
                });
            }
        })
    } else {
        Taro.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        });
    }
};

const showToast = (title) => {
    Taro.showToast({
        title: title || '',
        icon: 'none',
        mask: true
    })
};

//转formdata数据结构
const makeFormData = (obj, form, namespace) => {
    var fd = form || {};
    let formKey;
    if(obj instanceof Array) {
        obj.map((item, index) => {
            if(typeof item === 'object'){
                makeFormData(item, fd, namespace+'['+index+']');
            } else {
                // 若是数组则在关键字后面加上[]
                fd[namespace+'['+index+']'] = item || '';
            }
        });
    } else {
        for(let property in obj) {
            if(namespace) {
                // 若是对象，则这样
                formKey = namespace + '[' + property + ']';
            } else {
                formKey = property;
            }
    
            // if the property is an object, but not a File,
            // use recursivity.
            if(typeof obj[property] === 'object') {
                // 此处将formKey递归下去很重要，因为数据结构会出现嵌套的情况
                makeFormData(obj[property] || '', fd, formKey);
            } else {
                fd[formKey] = obj[property] || '';
            }
        }
    }
    return fd;
};

export {
    checkVersion,
    showToast,
    makeFormData
}
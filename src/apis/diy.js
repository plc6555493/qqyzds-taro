import { customRequest, upload, multipleUpload } from '../service/request';
import { makeFormData } from '../utils';
import cookies from 'weapp-cookie';

const url = 'https://biz.258m.com/';

//获取diy页面信息
const getDiyPage = () => {
    return customRequest({
        url: url + 'app/ewei_shopv2_api.php',
        data: {
            i: 1,
            r: 'diypage',
            type: 'home'
        }
    });
};

//修改diy页面信息
const saveDiyPage = (id, diypage, isdefault = 0) => {
    let formData = makeFormData({
        data: diypage
    });
    
    cookies.set('63b6___session', '3c88CsNKYHy3Fq7AVkMoq9i69JWfnk8Upll2dSUAB1DeNcsZVpvkn6AOx%2BNO22VigpZID3xTF9j5uPClgh6jp5ZOD127Sbg8mHBD8wvZKGvZVX8uX3fYL20wxWUGCYltQN9k5TiptvJe2f9vdquDJcUzV8TQ%2BtswM44xhsqeLp83nRmw', { domain: 'biz.258m.com' });
    return customRequest({
        url: url + 'web/index.php?c=site&a=entry&m=ewei_shopv2&do=web&r=app.page.edit',
        method: 'POST',
        data: {
            id: id,
            isdefault: isdefault,
            ...formData
        },
        header: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
};

//上传轮播图
const uploadBanner = (filePaths = []) => {
    let data = [];
    filePaths.map((item) => {
        data.push({
            filePath: item
        });
    });
    return multipleUpload(data).then((res) => {
        let images = [];
        let error = '';
        (res || []).map((item) => {
            if (!item.error) {
                let files = item.files || [];
                let url = (files[0] || {}).url || '';
                images.push(url);
            } else {
                error = item.msg;
                return false;
            }
        });
        
        if (!error) {
            return Promise.resolve(images);
        } else {
            return Promise.reject(new Error(error));
        }
    });
};

export default {
    getDiyPage,
    saveDiyPage,
    uploadBanner
}
import { handleActions } from 'redux-actions';
import { UPDATE_STORE } from '../constants';
import { init } from '../apis';

//设备信息
const initState = {
    storeId: '',
    storeName: '',
    init: true,//判断是否创建了小程序
    expiresTime: null,
    diypage: {},
    store_id: '1123',
    imgUrl: 'https://biz.258m.com/attachment/images/4/2019/07/GVvNHV6CfWhLF6rcHfBl3OF3bFw7z6.png',
    name: '世窗商城',
    expireTime: '2019-10-10'
};

export default handleActions({
    [UPDATE_STORE]: (state,{ payload }) =>({...state, ...payload})
}, initState)

export const initApp = () => async (dispatch) => {
    init.initApp().then((res) => {
        dispatch({ type: UPDATE_STORE, payload: {
            // init: res.tplInit || false,
            init: true
        }});
    });
};

export const updateDiyPage = (diypage) => async (dispatch) => {
    dispatch({ type: UPDATE_STORE, payload: {diypage: diypage}});
};

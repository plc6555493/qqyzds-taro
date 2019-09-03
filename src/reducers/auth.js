import Taro from '@tarojs/taro';
import { handleActions } from 'redux-actions';
import { UPDATE_AUTH } from '../constants';
import { auth, init } from '../apis';
import { initApp } from './store';

//应用权限
const initState = {
    isLogin: false,//是否登录
    token: '',
    openid: '',
    session_key: ''
};

export default handleActions({
    [UPDATE_AUTH]: (state,{ payload }) =>({...state, ...payload})
}, initState)

export const updateAuth = (payload) => async (dispatch) => {
    dispatch({ type: UPDATE_AUTH, payload: payload});
};

export const wxLogin = (code) => async (dispatch) => {
    return auth.wxLogin(code).then((res) => {
        if (res.token) {
            Taro.setStorageSync('token', res.token);
        }
        
        dispatch(initApp());
    
        dispatch({ type: UPDATE_AUTH, payload: {
            isLogin: true,
            ...res
        }});
        
        return Promise.resolve(res);
    });
};

export const wxBindPhone = (params) => async (dispatch) => {
    return Taro.login().then((res) => {
        return auth.wxLogin(res.code).then((res) => {
            params.session_key = res.session_key;
            params.openid = res.openid;
            params.from = 'store';
            return auth.wxBindPhone(params).then((res) => {
                if (res.token) {
                    Taro.setStorageSync('token', res.token);
                }
    
                dispatch(initApp());
    
                dispatch({ type: UPDATE_AUTH, payload: {
                    isLogin: true,
                    ...res
                }});
    
                return Promise.resolve(res);
            });
        });
    });
};

export const login = (phone, password) => async (dispatch) => {
    return auth.login(phone, password).then((res) => {
        if (res.token) {
            Taro.setStorageSync('token', res.token);
        }
        
        dispatch(initApp());
        
        dispatch({ type: UPDATE_AUTH, payload: {
            isLogin: true,
            ...res
        }});
    
        return Promise.resolve(res);
    });
};
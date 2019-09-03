import { handleActions } from 'redux-actions';
import { UPDATEUSERINFO } from '../constants';

//用户信息
const initState = {
};

export default handleActions({
    [UPDATEUSERINFO]: (state,{ payload }) =>({...state, ...payload})
}, initState)

export const updateUserInfo = (userInfo) => async (dispatch) => {
    dispatch({ type: UPDATEUSERINFO, payload: userInfo});
};
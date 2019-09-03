import { handleActions } from 'redux-actions';
import { UPDATE_SYSTEM } from '../constants';

//设备信息
const initState = {
};

export default handleActions({
    [UPDATE_SYSTEM]: (state,{ payload }) =>({...state, ...payload})
}, initState)

export const updateSystem = (systemInfo) => async (dispatch) => {
    dispatch({ type: UPDATE_SYSTEM, payload: systemInfo});
};
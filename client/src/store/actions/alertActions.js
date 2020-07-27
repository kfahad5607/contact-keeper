import { v4 as uuid } from 'uuid'
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../actions/actionTypes';


// Set alert
export const setAlert = (msg, type, timeOut = 5000) => (dispatch) => {
    const id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: { msg, type, id }
    });

    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    }, timeOut)
}


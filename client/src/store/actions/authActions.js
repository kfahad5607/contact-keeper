import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../actions/actionTypes';


// Load user
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({ type: AUTH_ERROR })
    }
}

// Register user
export const register = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        const res = await axios.post('/api/users', formData, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        loadUser();
    }
    catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
        })
    }
}

// Login user
export const login = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        let res = await axios.post('/api/auth', formData, config);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });

        loadUser();

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
}

// Logout
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
}

// clear errors
export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}




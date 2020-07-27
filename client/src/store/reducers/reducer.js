import { combineReducers } from 'redux';
import contactReducers from './contactReducers';
import authReducers from './authReducers';
import alertReducers from './alertReducers'


export default combineReducers({
    contact: contactReducers,
    auth: authReducers,
    alert: alertReducers
});


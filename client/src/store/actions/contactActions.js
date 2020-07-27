import axios from 'axios';
import {
    ADD_CONTACT,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    DELETE_CONTACT,
    SET_CURRENT,
    FILTER_CONTACTS,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../actions/actionTypes';


// Get Contacts
export const getContacts = (cxc) => async (dispatch) => {
    try {
        const res = await axios.get('/api/contacts');

        dispatch({
            type: GET_CONTACTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CONTACT_ERROR,
            payload: error.response.data.msg
        })
    }

}

// Add Contacts
export const addContact = contact => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.post('/api/contacts', contact, config);

        dispatch({
            type: ADD_CONTACT,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CONTACT_ERROR,
            payload: error.response
        })
    }

}

// Delete Contacts
export const deleteContact = id => async (dispatch) => {
    try {
        await axios.delete(`/api/contacts/${id}`);
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: CONTACT_ERROR,
            payload: error.response.data.msg
        })
    }

}

// Update Contacts
export const updateContact = contact => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
        dispatch({
            type: UPDATE_CONTACT,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CONTACT_ERROR,
            payload: error.response
        })
    }
}

// Set Current
export const setCurrent = (contact) => dispatch => {
    dispatch({
        type: SET_CURRENT,
        payload: contact
    })
}
// Clear Contacts
export const clearContacts = () => dispatch => {
    dispatch({
        type: CLEAR_CONTACTS
    })
}

// Clear Current
export const clearCurrent = () => dispatch => {
    dispatch({
        type: CLEAR_CURRENT
    })
}

// Filter Contacts
export const filterContacts = (text) => dispatch => {
    dispatch({
        type: FILTER_CONTACTS,
        payload: text
    })
}

// Clear Filter
export const clearFilter = () => dispatch => {
    dispatch({
        type: CLEAR_FILTER
    })
}


import {
    ADD_CONTACT,
    GET_CONTACTS,
    DELETE_CONTACT,
    SET_CURRENT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../actions/actionTypes';

const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload,
                ...state.contacts],
                loading: false
            }

        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }

        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
                loading: false
            }

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                loading: false
            }

        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }

        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter((contact) => {
                    let regex = new RegExp(`${action.payload}`, 'gi')
                    return (
                        contact.name.match(regex) || contact.email.match(regex) || contact.phone.match(regex)
                    )
                })
            }

        case CLEAR_CONTACTS:
            return {
                ...state,
                filtered: null,
                contact: null,
                error: null,
                current: null,
            }

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }

        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}

export default reducer
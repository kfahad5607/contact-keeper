import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteContact, setCurrent, clearCurrent, getContacts } from '../../store/actions/contactActions'


const ContactItem = ({ contact, setCurrent, clearCurrent, deleteContact, getContacts }) => {
    const { name, _id, type, email, phone } = contact;
    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }



    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '} <span
                    style={{ float: 'right' }}
                    className={'badge ' + (type === 'personal' ? 'badge-primary' : 'badge-success')}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                <ul className='list'>
                    {email && (<li>
                        <i className='fas fa-envelope-open'>{email}</i>
                    </li>)}
                    {phone && (<li>
                        <i className='fas fa-phone'>{phone}</i>
                    </li>)}
                </ul>
                <p>
                    <button className='btn btn-dark btn-sm' onClick={() => setCurrent(contact)}>
                        Edit
                    </button>
                    <button className='btn btn-danger btn-sm' onClick={onDelete} >
                        Delete
                    </button>
                </p>
            </h3>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    // auth: state.auth,
    // contact: state.contact,
    // alert: state.alert
});

export default connect(mapStateToProps, { deleteContact, getContacts, clearCurrent, setCurrent })(ContactItem)

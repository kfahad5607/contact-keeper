import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addContact, updateContact, clearCurrent } from '../../store/actions/contactActions';

const ContactForm = ({ contact: { current }, addContact, updateContact, clearCurrent }) => {
    useEffect(() => {
        if (current !== null) {
            setContact(current)
        }
        else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [current])

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });


    const { name, email, phone, type } = contact;


    const onChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }

    const clearAll = () => {
        clearCurrent();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);

        }
        else {
            updateContact(contact);
            clearCurrent();
        }
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }
    return (
        <form onSubmit={onSubmit}>
            <h2>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
            <input type='email' placeholder='Email' name='email' value={email} onChange={onChange} />
            <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange} />
            <h3>Contact Type:</h3>
            <input type='radio' name='type' value='personal' checked={type === 'personal'} onChange={onChange} />Personal{' '}
            <input type='radio' name='type' value='professional' checked={type === 'professional'} onChange={onChange} />Professional
            <div>
                <input type='submit' value={current ? 'Update Contact' : 'Add Contact'} className='btn btn-block btn-primary' />
            </div>
            {current && (<button className='btn btn-light btn-block' onClick={clearAll} >Clear</button>)}
        </form>
    )
}

const mapStateToProps = state => ({
    contact: state.contact
});

export default connect(mapStateToProps, { updateContact, clearCurrent, addContact })(ContactForm)

import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { filterContacts, clearFilter } from '../../store/actions/contactActions';

const ContactFilter = ({ contact: { filtered }, filterContacts, clearFilter }) => {
    const text = useRef('');

    useEffect(() => {
        if (filtered === null) {
            text.current.value = ''
        }
        // eslint-disable-next-line
    }, [])

    const onChange = (e) => {
        if (text.current.value !== '') {
            filterContacts(e.target.value);
        }
        else {
            clearFilter();
        }
    }
    return (
        <div>
            <input ref={text} type='text' placeholder='Filter contacts...' onChange={onChange} />
        </div>
    )
}

const mapStateToProps = state => ({
    contact: state.contact
});

export default connect(mapStateToProps, { filterContacts, clearFilter })(ContactFilter)

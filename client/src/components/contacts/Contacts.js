import React, { Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner';
import { getContacts } from '../../store/actions/contactActions'

const Contacts = ({ contact: { loading, contacts, filtered }, getContacts }) => {

    useEffect(() => {
        setTimeout(() => {
            getContacts();

        }, 500);
        // eslint-disable-next-line
    }, [])

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h3>Please Add a Contact.</h3>
    }
    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                    {filtered === null ? contacts.map((contact) => {
                        return <CSSTransition key={contact._id} timeout={500} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    }) : filtered.map((contact) => {
                        return <CSSTransition key={contact._id} timeout={500} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    })}
                </TransitionGroup>
            ) : <Spinner />}

        </Fragment>
    )
}

const mapStateToProps = state => ({
    contact: state.contact
});

export default connect(mapStateToProps, { getContacts })(Contacts)

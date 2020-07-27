import React, {useEffect} from 'react';
import Contacts from '../contacts/Contacts';
import {connect} from 'react-redux'
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import {loadUser} from '../../store/actions/authActions'

const Home = ({loadUser}) => {

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])
    return (
        <div className='grid-2'>
            <div>
               <ContactForm />
            </div>
            <div><ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    // auth: state.auth,
    // contact: state.contact,
    // alert: state.alert
  });

export default connect(mapStateToProps, {loadUser})(Home)

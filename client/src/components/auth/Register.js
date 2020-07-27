import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { register, clearErrors } from '../../store/actions/authActions'
import { setAlert } from '../../store/actions/alertActions'

const Register = (props) => {
    const { isAuthenticated, error } = props.auth
    const { register, clearErrors, setAlert } = props

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }
        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { name, email, password, confirmPassword } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please fill-up the fields.', 'danger')
        }
        else if (password !== confirmPassword) {
            setAlert('Please check your password', 'danger')
        }
        else {
            register({
                name,
                email,
                password
            })
        }
    }

    return (
        <div className='form-container'>
            <form onSubmit={onSubmit}>
                <h1>
                    Account <span className='text-primary'>Register</span>
                </h1>
                <div className='form-group'>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' name='name' id='name' value={name} placeholder='Name' onChange={onChange} required />
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' name='email' id='email' value={email} placeholder='Email' onChange={onChange} required />
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' name='password' id='password' value={password} placeholder='Password' onChange={onChange} required minLength='6' />
                </div>

                <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input type='password' name='confirmPassword' id='confirmPassword' value={confirmPassword} placeholder='Confirm Password' onChange={onChange} required minLength='6' />
                </div>

                <input type='submit' value='Register' className='btn btn-block btn-primary' />
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    alert: state.alert
});

export default connect(mapStateToProps, { register, clearErrors, setAlert })(Register)

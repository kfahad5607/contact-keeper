import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../store/actions/authActions'
import { setAlert } from '../../store/actions/alertActions'

const Login = (props) => {
    const { login, clearErrors, setAlert } = props
    const { error, isAuthenticated } = props.auth

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }
        if (error === 'Invalid credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const { email, password } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please enter email and password')
        }
        else {
            login({
                email,
                password
            });
        }
    }

    return (
        <div className='form-container'>
            <form onSubmit={onSubmit}>
                <h1>
                    Account <span className='text-primary'>Login</span>
                </h1>

                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' name='email' id='email' value={email} placeholder='Email' onChange={onChange} />
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' name='password' id='password' value={password} placeholder='Password' onChange={onChange} />
                </div>

                <input type='submit' value='Login' className='btn btn-block btn-primary' />
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    alert: state.alert
});

export default connect(mapStateToProps, { login, clearErrors, setAlert })(Login)

import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to='/' />
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)

            })
    }

    return (
        <div className='login-form'>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) =>
                        <li key={error}>{error}</li>
                    )}
                </ul>
                <div className='row'>
                    <label>
                        Username or email
                        <input
                            type='text'
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required />
                    </label>
                </div>
                <div className='row'>
                    <label>
                        Password
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type='submit'>Log In</button>
            </form>
        </div >
    )

}

export default LoginFormPage
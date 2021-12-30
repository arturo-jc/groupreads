import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { register } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Register = ({ authState, register }) => {

    const { isAuthenticated, error } = authState;
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
        if (error) {
            console.log(`ALERT: ${error}`)
        }
    }, [error, isAuthenticated]);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const { name, email, password, password2 } = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (name === "" || email === "" || password === "") {
            console.log("Alert: please enter all fields")
        } else if (password !== password2) {
            console.log("Alert: passwords do not match")
        } else {
            // See if you can just pass user
            const userData = { name, email, password }
            register(userData);
        }
    }

    return (
        <div className='card auth-card'>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                    <label className='hidden' htmlFor="name">Name</label>
                    <input className='form-input' type="text" name="name" id="name" value={name} onChange={onChange} placeholder='Name'/>
                    <label className='hidden' htmlFor="email">Email Adress</label>
                    <input className='form-input' type="email" name="email" id="email" value={email} onChange={onChange} placeholder='Email address'/>
                    <label className='hidden' htmlFor="password">Password</label>
                    <input className='form-input' type="password" name="password" id="password" value={password} onChange={onChange} placeholder='Password'/>
                    <label className='hidden' htmlFor="password2">Confirm password</label>
                    <input className='form-input' type="password" name="password2" id="password2" value={password2} onChange={onChange} placeholder='Confirm password'/>
                <input className='btn btn-yellow' type="submit" value="Register" />
            </form>
        </div>
    )
}

Register.propTypes = {
    register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth
})

const connection = connect(mapStateToProps, { register })
export default connection(Register);
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import { setAlert } from "../actions/alertActions";

const Login = ({ authState, login, setAlert }) => {
    const { isAuthenticated } = authState;
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [
        isAuthenticated
    ])

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const { email, password } = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        if (email === "" || password === "") {
            setAlert("Please enter all fields", "danger");
        } else {
            const userData = { email, password };
            login(userData);
        }
    }

    return (
        <div className="auth-container">
            <div className='card auth-card'>
                <h1>Login</h1>
                <form onSubmit={onSubmit}>
                    <label className='hidden' htmlFor="email">Email address</label>
                    <input className='form-input' type="email" name="email" id="email" value={email} onChange={onChange} placeholder='Email address'/>
                    <label className='hidden' htmlFor="password">Password</label>
                    <input className='form-input' type="password" name="password" id="password" password={password} onChange={onChange} placeholder='Password' />
                    <input className='btn btn-yellow' type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    authState: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth
})

const addState = connect(mapStateToProps, { login, setAlert })
export default addState(Login);
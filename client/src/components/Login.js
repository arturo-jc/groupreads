import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Login = ({ authState, login }) => {
    const { isAuthenticated, error } = authState;
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
        if (error) {
            console.log(`ALERT: ${error}`)
        }
    }, [error, isAuthenticated])

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
            console.log("Alert: please enter all fields")
        } else {
            const userData = { email, password };
            login(userData);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" id="email" value={email} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" password={password} onChange={onChange} />
                </div>
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth
})

const addState = connect(mapStateToProps, { login })
export default addState(Login);
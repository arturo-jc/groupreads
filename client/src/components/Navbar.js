import React, { Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { logout } from "../actions/authActions";
import { clearGroups, clearCurrentGroup } from '../actions/groupActions';
import { clearResults } from "../actions/searchActions";

const Navbar = ({ authState, title, icon, logout, clearGroups, clearCurrentGroup, clearResults }) => {

    const onLogout = () => {
        logout();
        clearGroups();
        clearCurrentGroup();
        clearResults();
    };

    const { isAuthenticated } = authState;

    const authLinks = (
        <Fragment>
            <button onClick={onLogout}>
                Sign out
            </button>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <Link to="register">Register</Link>
            <Link to="login">Login</Link>
        </Fragment>
    )

    return (
        <div>
            <Link to="/"><i className={icon} /> {title}</Link>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    authState: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    clearGroups: PropTypes.func.isRequired,
    clearCurrentGroup: PropTypes.func.isRequired,
    clearResults: PropTypes.func.isRequired
}

Navbar.defaultProps = {
    title: "Reading Group App",
    icon: "fas fa-book"
}

const mapStateToProps = state => ({
    authState: state.auth
})

const connection = connect(mapStateToProps, { logout, clearGroups, clearCurrentGroup, clearResults })

export default connection(Navbar);
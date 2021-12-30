import React from 'react';
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
            <button onClick={onLogout}>
                Sign out
            </button>
    )

    const guestLinks = (
        <div>
            <Link className='navlink' to="register">Register</Link>
            <Link className='navlink' to="login">Login</Link>
        </div>
    )

    return (
        <nav>
            <Link className='navlogo' to="/"><i className={icon} /> {title}</Link>
                {isAuthenticated ? authLinks : guestLinks}
        </nav>
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
    title: "groupreads",
    icon: "fas fa-book"
}

const mapStateToProps = state => ({
    authState: state.auth
})

const connection = connect(mapStateToProps, { logout, clearGroups, clearCurrentGroup, clearResults })

export default connection(Navbar);
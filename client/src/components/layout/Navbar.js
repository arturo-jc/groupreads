import React, { Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { logout } from "../../actions/authActions";
import { clearGroups, clearCurrent } from '../../actions/groupActions';

const Navbar = ({ authState, title, icon, logout, clearGroups, clearCurrent }) => {

    const onLogout = () => {
        logout();
        clearGroups();
        clearCurrent();
    };

    const { isAuthenticated } = authState;

    const authLinks = (
        <Fragment>
            <Link to="dashboard">Dashboard</Link>
            <li>
                <a href="#" onClick={onLogout}>Sign out</a>
            </li>
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
            <Link to=""><i className={icon} /> {title}</Link>
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
    clearCurrent: PropTypes.func.isRequired
}

Navbar.defaultProps = {
    title: "Reading Group App",
    icon: "fas fa-book"
}

const mapStateToProps = state => ({
    authState: state.auth
})

const connection = connect(mapStateToProps, { logout, clearGroups, clearCurrent })

export default connection(Navbar);
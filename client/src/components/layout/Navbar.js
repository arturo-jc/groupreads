import React, { Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { logout } from "../../actions/authActions";

const Navbar = ({ auth: { user, isAuthenticated }, title, icon, logout }) => {

    const onLogout = () => {
        logout();
        // todo: clear stuff
    };

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
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
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: "Reading Group App",
    icon: "fas fa-book"
}

const mapStateToProps = state => ({
    auth: state.auth
})

const connection = connect(mapStateToProps, { logout })

export default connection(Navbar);
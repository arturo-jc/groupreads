import React, {useState, useEffect, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/authActions";

const Navbar = ({ authState, title, icon, logout }) => {
    const [dropdown, setDropdown] = useState({show: false})
    const toggleDropdown = () => {
        setDropdown({
            show: !dropdown.show
        })
    }
    const closeDropdown = () => {
        setDropdown({
            show: false
        })
    }

    useEffect(() => {
        closeDropdown();
    }, [window.location.href])

    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/");
    };

    const { isAuthenticated, user } = authState;

    const authLinks = (
                <ul>
                {user && <Link to="account" className='navlink'>{user.name}</Link>}                    
                <li className='navlink' onClick={onLogout}>
                        Sign out
                    </li>
                </ul>
                    )

    const guestLinks = (
        <Fragment>
            <Link className='navlink' to="register">Register</Link>
            <Link className='navlink' to="login">Login</Link>
        </Fragment>
    )

    return (
        <nav className={window.location.pathname === "/" && !isAuthenticated ? "transparent" : "visible"}>
            <Link className='navlink' to="/"><i className={icon} /> {title}</Link>
            <div className={`navlinks ${dropdown.show && "active"}`}>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
            <a onClick={toggleDropdown} className='navlink ham-menu'>
            <i className='fas fa-bars fa-lg'></i>    
            </a>            
        </nav>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    authState: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

Navbar.defaultProps = {
    title: "groupreads",
    icon: "fas fa-book"
}

const mapStateToProps = state => ({
    authState: state.auth
})

const connection = connect(mapStateToProps, {logout})

export default connection(Navbar);
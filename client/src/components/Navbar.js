import React, {useState} from 'react';
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

    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/");
        closeDropdown();
    };

    const { isAuthenticated, user } = authState;

    const authLinks = (
            <ul>
                {user && <li className='navlink' onClick={toggleDropdown}>{user.name}</li>}
                <ul className={`dropdown ${dropdown.show && "active"}`}>
                    <Link to="account" className='navlink' onClick={closeDropdown}>Account</Link>
                    <li className='navlink' onClick={onLogout}>
                        Sign out
                    </li>
                </ul>
            </ul>
    )

    const guestLinks = (
        <div>
            <Link className='navlink' to="register">Register</Link>
            <Link className='navlink' to="login">Login</Link>
        </div>
    )

    return (
        <nav>
            <Link className='navlink' to="/"><i className={icon} /> {title}</Link>
                {isAuthenticated ? authLinks : guestLinks}
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
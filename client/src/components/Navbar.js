import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/authActions";
import { clearGroups, clearCurrentGroup, clearGroupSearchResults } from '../actions/groupActions';
import { clearResults, clearCurrentResult } from "../actions/searchActions";
import { clearRecords, clearCurrentRecord } from '../actions/recordActions';
import { clearPosts } from '../actions/postActions';
import { clearMarkers } from '../actions/markerActions';
import { clearBookmarks } from '../actions/bookmarkActions';

const Navbar = ({ authState, title, icon, logout, clearGroups, clearCurrentGroup, clearGroupSearchResults, clearResults, clearCurrentResult, clearRecords, clearCurrentRecord, clearPosts, clearMarkers, clearBookmarks }) => {

    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/");
        clearGroups();
        clearCurrentGroup();
        clearGroupSearchResults();
        clearResults();
        clearCurrentResult();
        clearRecords();
        clearCurrentRecord();
        clearPosts();
        clearMarkers();
        clearBookmarks();
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
    clearGroupSearchResults: PropTypes.func.isRequired,
    clearResults: PropTypes.func.isRequired,
    clearCurrentResult: PropTypes.func.isRequired,
    clearRecords: PropTypes.func.isRequired,
    clearCurrentRecord: PropTypes.func.isRequired,
    clearPosts: PropTypes.func.isRequired,
    clearMarkers: PropTypes.func.isRequired,
    clearBookmarks: PropTypes.func.isRequired
}

Navbar.defaultProps = {
    title: "groupreads",
    icon: "fas fa-book"
}

const mapStateToProps = state => ({
    authState: state.auth
})

const connection = connect(mapStateToProps,
    { 
        logout, 
        clearGroups, 
        clearCurrentGroup,
        clearGroupSearchResults,
        clearResults,
        clearCurrentResult,
        clearRecords,
        clearCurrentRecord,
        clearPosts,
        clearMarkers,
        clearBookmarks
    })

export default connection(Navbar);
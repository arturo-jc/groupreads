import React, { useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Landing from "./home/Landing"
import Dashboard from "./home/Dashboard"
import { loadUser } from '../actions/authActions';
import { getGroups } from '../actions/groupActions';

const Home = ({ authState, loadUser, getGroups }) => {
    useEffect(() => {
        if (localStorage.token) {
            loadUser();
        }
    }, [])

    const { isAuthenticated, loading } = authState;
    return !isAuthenticated && !loading ? <Landing /> : <Dashboard />
}

Home.propTypes = {
    authState: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    getGroups: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth
})

const addState = connect(mapStateToProps, { loadUser, getGroups });

export default addState(Home);
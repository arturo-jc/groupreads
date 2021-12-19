import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ authState, redirect, element }) => {
    const { isAuthenticated, loading } = authState;

    return !isAuthenticated && !loading ? <Navigate to={redirect} /> : element;
};

PrivateRoute.propTypes = {
    redirect: PropTypes.string.isRequired,
    element: PropTypes.element.isRequired,
    authState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth
})

const addState = connect(mapStateToProps);

export default addState(PrivateRoute);
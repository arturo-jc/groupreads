import React, {useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { setAlert } from '../actions/alertActions';
import { clearErrors } from "../actions/genericActions";

const Alerts = ({alertState, searchState, authState, groupState, markerState, postState, bookmarkState, commentState, recordState, setAlert, clearErrors }) => {
    
    const error = authState.error || searchState.error || groupState.error || markerState.error || postState.error || bookmarkState.error || commentState.error || recordState.error

    useEffect(() => {
        if (error) {
            setAlert(error, "danger");
            clearErrors();
        }
    }, [error]);

    return (
        alertState.length > 0 && alertState.map(alert =>(
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className='fas fa-info-circle'></i> {alert.msg}           
            </div>
        ))

    )
}

Alerts.propTypes = {
    alertState: PropTypes.array.isRequired,
    authState: PropTypes.object.isRequired,
    groupState: PropTypes.object.isRequired,
    markerState: PropTypes.object.isRequired,
    postState: PropTypes.object.isRequired,
    bookmarkState: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    commentState: PropTypes.object.isRequired,
    recordState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    alertState: state.alert,
    searchState: state.search,
    authState: state.auth,
    groupState: state.group,
    markerState: state.marker,
    postState: state.post,
    bookmarkState: state.bookmark,
    commentState: state.comment,
    recordState: state.record
})

const addState = connect(mapStateToProps, {setAlert, clearErrors});

export default addState(Alerts);

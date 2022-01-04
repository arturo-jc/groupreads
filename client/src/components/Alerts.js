import React, {useEffect } from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { setAlert } from '../actions/alertActions';
import { clearErrors } from "../actions/genericActions";
import { removeAlert } from '../actions/alertActions';

const Alerts = ({alertState, searchState, authState, groupState, markerState, postState, bookmarkState, commentState, recordState, setAlert, clearErrors, removeAlert }) => {
    
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
                <p><i className='fas fa-info-circle'></i> {alert.msg}</p>
                <button type='button' className='btn-delete' onClick={() => removeAlert(alert.id)}><i className="fas fa-times fa-2x"></i></button>
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
    recordState: state.record,
    removeAlert: PropTypes.func.isRequired
})

const addState = connect(mapStateToProps, {setAlert, clearErrors, removeAlert});

export default addState(Alerts);

import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DeclinedRequests = ({groupState, handleClose }) => {
    return <Users title='Declined Requests' users={groupState.current.declinedRequests} showButtons={"accept"} handleClose={handleClose}/>
}

DeclinedRequests.propTypes = {
    groupState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group
})

const addState = connect(mapStateToProps);

export default addState(DeclinedRequests)

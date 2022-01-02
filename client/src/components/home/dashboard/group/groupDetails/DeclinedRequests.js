import React from 'react';
import Requests from './Requests';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DeclinedRequests = ({groupState, handleClose }) => {
    const { current } = groupState;
    if (current){
        return (
            <Requests title={"Declined Requests"} requests={current.declinedRequests} showButtons={"accept"} handleClose={handleClose}/>
        )
    }
    return null
}

DeclinedRequests.propTypes = {
    groupState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group
})

const addState = connect(mapStateToProps);

export default addState(DeclinedRequests)

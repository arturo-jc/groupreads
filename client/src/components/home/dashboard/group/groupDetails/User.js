import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { acceptRequest, declineRequest } from '../../../../../actions/groupActions';
import PropTypes from 'prop-types';

const User = ({user, showButtons , acceptRequest, declineRequest, handleClose }) => {
    const { groupId } = useParams();
    const accept = () => {
        acceptRequest(groupId, user._id);
        if (handleClose){
            handleClose();
        }
    }
    const decline = () => {
        declineRequest(groupId, user._id)
    }
    return (
        <div className='user-sm'>
            <p>{user.name}</p>
            { (showButtons === "all" || showButtons === "accept") && <button className='btn btn-yellow' onClick={accept}>Accept</button>}
            { (showButtons === "all" || showButtons === "decline") && <button className='btn btn-grey' onClick={decline}>Decline</button>}
        </div>
    )
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    acceptRequest: PropTypes.func.isRequired,
    declineRequest: PropTypes.func.isRequired
}

const addState = connect(null, {acceptRequest, declineRequest})

export default addState(User);
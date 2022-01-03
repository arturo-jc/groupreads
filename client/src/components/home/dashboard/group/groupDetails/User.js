import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { acceptRequest, declineRequest } from '../../../../../actions/groupActions';
import PropTypes from 'prop-types';
import cloudinary from '../../../../../utils/cloudinary';
import blank from "./blank-profile-photo-sm.jpeg"

const User = ({user, showButtons = false, acceptRequest, declineRequest, handleClose }) => {
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
        <div className='user'>
            <div className="user-details">
            <img className='profile profile-sm' src={ user.profilePic? cloudinary.small(user.profilePic.url) : blank }/>
            <p>{user.name}</p>
            </div>
            <div className="user-btns">
                { (showButtons === "all" || showButtons === "accept") && <button className='btn btn-yellow' onClick={accept}>Accept</button>}
                { (showButtons === "all" || showButtons === "decline") && <button className='btn btn-grey' onClick={decline}>Decline</button>}
            </div>
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
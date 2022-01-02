import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { acceptRequest } from '../../../../../actions/groupActions';

const User = ({user, showButtons = false, acceptRequest }) => {
    const { groupId } = useParams();
    const accept = () => {
        acceptRequest(groupId, user._id)
    }
    return (
        <div className='user-sm'>
            <p>{user.name}</p>
            {showButtons && 
            <div>
                <button className='btn btn-green' onClick={accept}>Accept</button>
                <button className='btn btn-red'>Decline</button>                
            </div>}
        </div>
    )
}

const addState = connect(null, {acceptRequest})

export default addState(User);
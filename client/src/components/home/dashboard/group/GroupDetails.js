import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Records from './groupDetails/Records';
import Modal from "../../../Modal";
import PropTypes from 'prop-types';
import DeleteGroup from './groupDetails/DeleteGroup';
import DeclinedRequests from './groupDetails/DeclinedRequests';
import LeaveGroup from './groupDetails/LeaveGroup';
import InviteFriends from './groupDetails/InviteFriends';
import Users from './groupDetails/Users';
import { openModal, closeModal } from "../../../../actions/modalActions"

const GroupDetails = ({authState, groupState, openModal, closeModal }) => {
    const [deleteGroupModal, setDeleteGroupModal] = useState({show: false});
    const showDeleteGroupModal = () => {
        setDeleteGroupModal({
            show: true
        })
        openModal()
    }
    const hideDeleteGroupModal = () => {
        setDeleteGroupModal({
            show: false
        })
        closeModal()
    }
    const [declinedRequestsModal, setDeclinedRequestsModal] = useState({show: false})
    const showDeclinedRequestsModal = () => {
        setDeclinedRequestsModal({
            show: true
        })
        openModal()
    }
    const hideDeclinedRequestsModal = () => {
        setDeclinedRequestsModal({
            show: false
        })
        closeModal()
    }
    const [leaveGroupModal, setLeaveGroupModal] = useState({show: false})
    const showLeaveGroupModal = () => {
        setLeaveGroupModal({
            show: true
        })
        openModal()
    }
    const hideLeaveGroupModal = () => {
        setLeaveGroupModal({
            show: false
        })
        closeModal()
    }
    const [inviteFriendsModal, setInviteFriendsModal] = useState({show: false})
    const showInviteFriendsModal = () => {
        setInviteFriendsModal({
            show: true
        })
        openModal()
    }
    const hideInviteFriendsModal = () => {
        setInviteFriendsModal({
            show: false
        })
        closeModal()
    }
    const { user } = authState;
    const { current } = groupState

    return (
        <div>
            <div className="card">
                {current && <h2>{current.name}</h2>}
                {current && <Users title='Members' users={current.members}/>}
                {current && current.pendingRequests.length > 0 && <Users title='Pending Requests' users={current.pendingRequests} showButtons={"all"} /> }
                <div className='btn-group'>
                    <button className="btn btn-yellow" onClick={showInviteFriendsModal}>Invite friends</button>
                    <Modal show={inviteFriendsModal.show} handleClose={hideInviteFriendsModal} Component={InviteFriends} />
                    {current && current.members.length === 1 && current.members.map(member => member._id).includes(user._id) && <button className='btn btn-red' onClick={showDeleteGroupModal}>Delete group</button>}
                    <Modal show={deleteGroupModal.show} handleClose={hideDeleteGroupModal} Component={DeleteGroup}/>
                    {current && current.members.length > 1 && <button className='btn btn-red' onClick={showLeaveGroupModal}>Leave group</button> }
                    <Modal show={leaveGroupModal.show} handleClose={hideLeaveGroupModal} Component={LeaveGroup}/>
                    {current && current.declinedRequests.length > 0 && <button className='btn btn-grey' onClick={showDeclinedRequestsModal}>More</button> }
                    {current && current.declinedRequests.length > 0  && <Modal show={declinedRequestsModal.show} handleClose={hideDeclinedRequestsModal} Component={DeclinedRequests}/>}
                </div>
            </div>
            <div className="card">
                <Records />
                <div className="btn-group">
                    <Link className='btn btn-yellow' to="search">Add books</Link>
                </div>
            </div>
        </div>
    )
}

GroupDetails.propTypes = {
    authState: PropTypes.object.isRequired,
    groupState: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth,
    groupState: state.group
})

const addState = connect(mapStateToProps, { openModal, closeModal })

export default addState(GroupDetails);
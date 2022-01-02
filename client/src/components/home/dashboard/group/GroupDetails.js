import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Members from './groupDetails/Members';
import Requests from './groupDetails/Requests';
import Records from './groupDetails/Records';
import Modal from "../../../Modal";
import PropTypes from 'prop-types';
import DeleteGroup from './groupDetails/DeleteGroup';
import DeclinedRequests from './groupDetails/DeclinedRequests';
import LeaveGroup from './groupDetails/LeaveGroup';

const GroupDetails = ({authState, groupState}) => {
    const [deleteGroupModal, setDeleteGroupModal] = useState({show: false});
    const showDeleteGroupModal = () => {
        setDeleteGroupModal({
            show: true
        })
    }
    const hideDeleteGroupModal = () => {
        setDeleteGroupModal({
            show: false
        })
    }
    const [declinedRequestsModal, setDeclinedRequestsModal] = useState({show: false})
    const showDeclinedRequestsModal = () => {
        setDeclinedRequestsModal({
            show: true
        })
    }
    const hideDeclinedRequestsModal = () => {
        setDeclinedRequestsModal({
            show: false
        })
    }
    const [leaveGroupModal, setLeaveGroupModal] = useState({show: false})
    const showLeaveGroupModal = () => {
        setLeaveGroupModal({
            show: true
        })
    }
    const hideLeaveGroupModal = () => {
        setLeaveGroupModal({
            show: false
        })
    }

    const { user } = authState;
    const { current } = groupState

    return (
        <div>
            <div className="card">
                {current && <Members members={current.members} /> }
                {current && current.pendingRequests.length > 0 && <Requests title='Pending Requests' requests={current.pendingRequests} showButtons={"all"} /> }
                <div className='btn-group'>
                    <button className="btn btn-yellow">Invite</button>
                    {current && current.members.length === 1 && current.members.map(member => member._id).includes(user._id) && <button className='btn btn-red' onClick={showDeleteGroupModal}>Delete group</button>}
                    {current && current.members.length > 1 && <button className='btn btn-red' onClick={showLeaveGroupModal}>Leave group</button> }
                    {current && current.declinedRequests.length > 0 && <button className='btn btn-grey' onClick={showDeclinedRequestsModal}>More</button> }
                </div>
            </div>
            <div className="card">
                <Records />
                <div className="btn-group">
                    <Link className='btn btn-yellow' to="search">Add books</Link>
                </div>
            </div>
            <Modal show={deleteGroupModal.show} handleClose={hideDeleteGroupModal} Component={DeleteGroup}/>
            <Modal show={declinedRequestsModal.show} handleClose={hideDeclinedRequestsModal} Component={DeclinedRequests}/>
            <Modal show={leaveGroupModal.show} handleClose={hideLeaveGroupModal} Component={LeaveGroup}/>
        </div>
    )
}

GroupDetails.propTypes = {
    authState: PropTypes.object.isRequired,
    groupState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth,
    groupState: state.group
})

const addState = connect(mapStateToProps)

export default addState(GroupDetails);
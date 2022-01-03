import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Members from './groupDetails/Members';
// import Requests from './groupDetails/Requests';
import Records from './groupDetails/Records';
import Modal from "../../../Modal";
import PropTypes from 'prop-types';
import DeleteGroup from './groupDetails/DeleteGroup';
// import DeclinedRequests from './groupDetails/DeclinedRequests';
import LeaveGroup from './groupDetails/LeaveGroup';
import Users from './groupDetails/Users';

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
                {current && <h2>{current.name}</h2>}
                {current && <Users title='Members' users={current.members}/>}
                {current && current.pendingRequests.length > 0 && <Users title='Pending Requests' users={current.pendingRequests} showButtons={"all"} /> }
                <div className='btn-group'>
                    <button className="btn btn-yellow">Invite friends</button>
                    {current && current.members.length === 1 && current.members.map(member => member._id).includes(user._id) && <button className='btn btn-red' onClick={showDeleteGroupModal}>Delete group</button>}
                    <Modal show={deleteGroupModal.show} handleClose={hideDeleteGroupModal} Component={DeleteGroup}/>
                    {current && current.members.length > 1 && <button className='btn btn-red' onClick={showLeaveGroupModal}>Leave group</button> }
                    <Modal show={leaveGroupModal.show} handleClose={hideLeaveGroupModal} Component={LeaveGroup}/>
                    {current && current.declinedRequests.length > 0 && <button className='btn btn-grey' onClick={showDeclinedRequestsModal}>More</button> }
                    {/* {current && <Modal show={declinedRequestsModal.show} handleClose={hideDeclinedRequestsModal} Component={<Users title='Declined Requests' users={current.declinedRequests}/>}/>} */}
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
    groupState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth,
    groupState: state.group
})

const addState = connect(mapStateToProps)

export default addState(GroupDetails);
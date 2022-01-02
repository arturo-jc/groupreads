import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { leaveGroup, clearCurrentGroup } from '../../../../../actions/groupActions';
import PropTypes from 'prop-types';

const LeaveGroup = ({leaveGroup}) => {
    const groupId = useParams();
    const navigate = useNavigate();
    const leave = () => {
        leaveGroup(groupId);
        clearCurrentGroup();
        navigate("/")
    }
    return (
        <div>
            <h3>Leave Group</h3>
            <p>Are you sure you want to leave?</p>
            <button className='btn btn-red' onClick={leave}>Leave</button>
        </div>
    )
}

LeaveGroup.propTypes = {
    leaveGroup: PropTypes.func.isRequired
}

const addState = connect(null, {leaveGroup})

export default addState(LeaveGroup);

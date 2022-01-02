import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteGroup, clearCurrentGroup } from "../../../../../actions/groupActions";
import PropTypes from 'prop-types'

const DeleteGroup = ({deleteGroup, clearCurrentGroup }) => {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const onClick = () => {
        deleteGroup(groupId);
        clearCurrentGroup();
        navigate("/")
    }
    return (
        <div>
            <h3>Warning</h3>
            <p>This action will permanently delete all books, posts, and all other data associated with this group. Do you wish to proceed?</p>
            <button className='btn btn-red' onClick={onClick}>Delete</button>
        </div>
    )
}

DeleteGroup.propTypes = {
    deleteGroup: PropTypes.func.isRequired,
    clearCurrentGroup: PropTypes.func.isRequired
}

const addState = connect(null, {deleteGroup, clearCurrentGroup })

export default addState(DeleteGroup);

import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { getGroups } from "../../../../../actions/groupActions"
import { deleteRecord } from '../../../../../actions/recordActions';
import { clearPosts } from '../../../../../actions/postActions';
import { clearMarkers } from '../../../../../actions/markerActions';
import { clearBookmarks } from '../../../../../actions/bookmarkActions';

const DeleteRecord = ({getGroups, deleteRecord, clearPosts, clearMarkers, clearBookmarks}) => {

    const { groupId, recordId } = useParams();
    const navigate = useNavigate();
    const onClick = async () => {
        await deleteRecord(groupId, recordId);
        clearPosts();
        clearMarkers();
        clearBookmarks();
        navigate(`/groups/${groupId}`);
    }

    return (
        <div>
            <h3>Warning</h3>
            <p>This action will permanently delete all posts, bookmarks, and all other data associated with this book. Do you wish to proceed?</p>
            <button className='btn btn-red' onClick={onClick}>Delete</button>
        </div>
    )
}

DeleteRecord.propTypes = {
    deleteRecord: PropTypes.func.isRequired,
    clearPosts: PropTypes.func.isRequired,
    clearMarkers: PropTypes.func.isRequired,
    clearBookmarks: PropTypes.func.isRequired
}

const addState = connect(null, {getGroups, deleteRecord, clearPosts, clearMarkers, clearBookmarks})

export default addState(DeleteRecord);
import React from 'react';
import { useParams } from 'react-router-dom';
import {connect} from "react-redux";
import { deleteBookmark } from '../../../../../actions/bookmarkActions';
import PropTypes from 'prop-types';

const Bookmark = ({bookmark, deleteBookmark, authState}) => {

    const { user } = authState;
    const { groupId, recordId } = useParams();

    return (
        <div className='card bookmark'>
            <p>
            <i className="fas fa-bookmark fa-lg"></i> {bookmark.addedBy.name} added a bookmark on page {bookmark.page}: {bookmark.body}
            </p>
            {user._id === bookmark.addedBy._id && <button type='button' className='btn-delete' onClick={() => deleteBookmark(groupId, recordId, bookmark._id)}><i className="fas fa-trash-alt fa-lg"></i></button>}
        </div>
    )
}

Bookmark.propTypes = {
    bookmark: PropTypes.object.isRequired,
    deleteBookmark: PropTypes.func.isRequired,
    authState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth
})

const addState = connect(mapStateToProps, {deleteBookmark});

export default addState(Bookmark);
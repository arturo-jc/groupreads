import React from 'react';
import { useParams } from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {deleteComment} from "../../../../../../actions/commentActions";
import { getPostsFor } from '../../../../../../actions/postActions';

const Comment = ({comment, postId, authState, deleteComment, getPostsFor}) => {
    const { user } = authState;
    const { groupId, recordId } = useParams();
    const onClick = () => {
        deleteComment(groupId, recordId, postId, comment._id);
    }

    return (
        <div className='comment'>
            <div className="author-actions">
            <p>{comment.author.name} wrote:</p>
            {user._id === comment.author._id && <button type='button' className='btn-delete' onClick={onClick}><i className="fas fa-trash-alt fa-lg"></i></button>}
            </div>
            <p>{comment.body}</p>
        </div>
    )
}


Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    authState: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    getPostsFor: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth
})

const addState = connect(mapStateToProps, { deleteComment, getPostsFor });


export default addState(Comment);
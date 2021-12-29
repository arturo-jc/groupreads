import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addComment } from '../../../../../../actions/commentActions';
import { getPostsFor } from "../../../../../../actions/postActions";

const AddCommentForm = ({ postId, groupState, recordState, addComment, getPostsFor }) => {

    // Form state
    const [comment, setComment] = useState({
        body: ""
    });

    const { current: group } = groupState;
    const { current: record } = recordState;

    const onChange = e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        addComment(group._id, record._id, postId, comment);
        getPostsFor(group._id, record)
    }

    return (
        <form className='add-comment-form' onSubmit={onSubmit}>
            <label className='hidden' htmlFor="body">Body</label>
            <textarea className='form-text-area' type="text" id="body" name="body" value={comment.body} onChange={onChange} placeholder='Write a comment here...' />
            <input className='btn btn-grey' type="submit" value="Post comment" />
        </form>
    )
};

AddCommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired,
    groupState: PropTypes.object.isRequired,
    recordState: PropTypes.object.isRequired,
    getPostsFor: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group,
    recordState: state.record
})

const addState = connect(mapStateToProps, { addComment, getPostsFor });
export default addState(AddCommentForm);
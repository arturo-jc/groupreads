import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addPost } from '../../../../../actions/postActions';

const NewPostForm = ({ groupState, recordState, addPost, handleClose }) => {

    const { current: group } = groupState;
    const { current: record } = recordState;

    const [post, setPost] = useState({
        title: "",
        body: ""
    })

    const onChange = e => {
        e.preventDefault();
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        addPost(group._id, record._id, post);
        handleClose();
    }


    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={post.title} onChange={onChange} />
            <label htmlFor="body">Body</label>
            <input type="text" name="body" id="body" value={post.body} onChange={onChange} />
            <input type="submit" value="Post" />
        </form>
    )
}

NewPostForm.propTypes = {
    groupState: PropTypes.object.isRequired,
    recordState: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group,
    recordState: state.record
})

const addState = connect(mapStateToProps, { addPost });
export default addState(NewPostForm);
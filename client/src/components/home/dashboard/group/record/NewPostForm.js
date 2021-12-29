import React, { useState, Fragment } from 'react';
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
        <Fragment>
            <h3>New Post</h3>
        <form onSubmit={onSubmit}>
            <label className='hidden' htmlFor="title">Title</label>
            <input className='form-input' type="text" name="title" id="title" value={post.title} onChange={onChange} placeholder="New post's title" />
            <label className='hidden' htmlFor="body">Body</label>
            <input className='form-input' type="text" name="body" id="body" value={post.body} onChange={onChange} placeholder='Write something here...' />
            <input className='btn btn-yellow' type="submit" value="Post" />
        </form>
        </Fragment>
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
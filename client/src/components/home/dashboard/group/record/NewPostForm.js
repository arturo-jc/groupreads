import React, { useState, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addPost } from '../../../../../actions/postActions';
import { setAlert } from '../../../../../actions/alertActions';

const NewPostForm = ({ groupState, recordState, addPost, setAlert }) => {

    const { current: group } = groupState;
    const { current: record } = recordState;

    const [post, setPost] = useState({
        title: "",
        body: ""
    })

    const onChange = e => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        if(post.title === "" || post.body === "" ){
            setAlert("Please fill out all fields.", "danger")
        } else{
            addPost(group._id, record._id, post);
            setPost({
                title: "",
                body: ""
            });
        }
    }

    return (
        <Fragment>
        <h3>New Post</h3>
        <form className='add-post-form' onSubmit={onSubmit}>
            <label className='hidden' htmlFor="title">Post title</label>
            <input className='form-input input-long' type="text" name="title" id="title" value={post.title} onChange={onChange} placeholder="Title" />
            <label className='hidden' htmlFor="body">Post body</label>
            <textarea className='form-text-area expanded' type="text" name="body" id="body" value={post.body} onChange={onChange} placeholder='Write a comment here...' />
            <input className='btn btn-yellow' type="submit" value="Submit"/>
        </form>
        </Fragment>
    )
}

NewPostForm.propTypes = {
    groupState: PropTypes.object.isRequired,
    recordState: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group,
    recordState: state.record,
    setAlert: PropTypes.func.isRequired
})

const addState = connect(mapStateToProps, { addPost, setAlert });
export default addState(NewPostForm);
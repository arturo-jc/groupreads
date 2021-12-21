import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addPost } from '../../../../actions/postActions';

const AddPostForm = ({ groupState, recordState, addPost }) => {

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

AddPostForm.propTypes = {
    groupState: PropTypes.object.isRequired,
    recordState: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group,
    recordState: state.record
})

const addState = connect(mapStateToProps, { addPost });
export default addState(AddPostForm);
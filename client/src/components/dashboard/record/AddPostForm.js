import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addPost } from "../../../actions/postActions";

const AddPostForm = ({ addPost }) => {

    const { groupId, recordId } = useParams();

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
        addPost(groupId, recordId, post);
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
    addPost: PropTypes.func.isRequired
}

const addState = connect(null, { addPost });
export default addState(AddPostForm);
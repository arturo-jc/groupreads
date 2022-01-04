import React, { useState, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addPost } from '../../../../../actions/postActions';
import { setAlert } from '../../../../../actions/alertActions';
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NewPostForm = ({ groupState, recordState, addPost, setAlert }) => {

    const toolbar = [
        'heading', '|',
        'bold','italic', 'link', 'bulletedList', 'numberedList', '|',
        'outdent', 'indent', '|',
        'blockQuote', 'undo', 'redo'
    ]

    const { current: group } = groupState;
    const { current: record } = recordState;

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const onTitleChange = e => {
        setTitle(e.target.value)
    }

    const onBodyChange = (e, editor) => {
        setBody(editor.getData())
    }

    const onSubmit = e => {
        e.preventDefault()
        if(title === "" || body === "" ){
            setAlert("Please fill out all fields.", "danger")
        } else{
            const post = {title, body}
            addPost(group._id, record._id, post);
            setTitle("");
            setBody("");
        }
    }

    return (
        <Fragment>
        <h3>New Post</h3>
        <form className='add-post-form' onSubmit={onSubmit}>
            <label className='hidden' htmlFor="title">Title</label>
            <input className='form-input input-long' type="text" name="title" id="title" value={title} onChange={onTitleChange} placeholder="Title" />
            <CKEditor editor={ClassicEditor} data={body} config={{toolbar}} onChange={onBodyChange}/>
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
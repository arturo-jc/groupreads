import React, { useState, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addBookmark } from '../../../../../actions/bookmarkActions';
import { setAlert } from '../../../../../actions/alertActions';

const NewBookmarkForm = ({ groupState, recordState, addBookmark, setAlert, handleClose }) => {

    const { current: group } = groupState;
    const { current: record } = recordState;

    const [bookmark, setBookmark] = useState({
        body: "",
        page: null
    })

    const onChange = e => {
        e.preventDefault();
        setBookmark({
            ...bookmark,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        if(bookmark.body === "" || bookmark.page === null){
            setAlert("Please fill out all fields.", "danger");
        } else{
            addBookmark(group._id, record._id, bookmark);
        }
        handleClose();
    }

    return (
        <Fragment>
            <h3>New Bookmark</h3>
            <form onSubmit={onSubmit}>
                <label htmlFor="page">Page number:</label>
                <input className='form-input' type="number" name="page" id="page" onChange={onChange} />
                <label htmlFor="body">Content:</label>
                <input className='form-input' type="text" name="body" id="body" onChange={onChange} placeholder='Write something here...'/>
                <input className='btn btn-yellow' type="submit" value="Add bookmark" />
            </form>
        </Fragment>
    )
}

NewBookmarkForm.propTypes = {
    addBookmark: PropTypes.func.isRequired,
    groupState: PropTypes.object.isRequired,
    recordState: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group,
    recordState: state.record
})

const addState = connect(mapStateToProps, { addBookmark, setAlert })

export default addState(NewBookmarkForm);
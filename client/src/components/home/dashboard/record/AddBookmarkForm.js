import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addBookmark } from '../../../../actions/bookmarkActions';


const AddBookmarkForm = ({ groupState, recordState, addBookmark }) => {

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
        addBookmark(group._id, record._id, bookmark)
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="body">Body</label>
            <input type="text" name="body" id="body" onChange={onChange} />
            <label htmlFor="page">Page number</label>
            <input type="number" name="page" id="page" onChange={onChange} />
            <input type="submit" value="Add bookmark" />
        </form>
    )
}

AddBookmarkForm.propTypes = {
    addBookmark: PropTypes.func.isRequired,
    groupState: PropTypes.object.isRequired,
    recordState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group,
    recordState: state.record
})

const addState = connect(mapStateToProps, { addBookmark })

export default addState(AddBookmarkForm);
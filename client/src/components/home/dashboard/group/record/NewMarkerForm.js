import React, { useState } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addMarker } from '../../../../../actions/markerActions';

const NewMarkerForm = ({ groupState, recordState, addMarker, handleClose }) => {

    const { current: group } = groupState;
    const { current: record } = recordState;

    const [marker, setmarker] = useState({ page: null })

    const onChange = e => {
        e.preventDefault();
        setmarker({
            ...marker,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        addMarker(group._id, record._id, marker);
        handleClose();
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="page">Enter page number</label>
            <input type="number" name="page" id="page" onChange={onChange} />
            <input type="submit" value="Add progress marker" />
        </form>
    )
}

NewMarkerForm.propTypes = {
    addMarker: PropTypes.func.isRequired,
    groupState: PropTypes.object.isRequired,
    recordState: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group,
    recordState: state.record
})

const addState = connect(mapStateToProps, { addMarker })

export default addState(NewMarkerForm)

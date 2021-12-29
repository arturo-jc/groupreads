import React, { useState, Fragment } from 'react'
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
    let pageCount = 0;
    if (record.book.pageCount){
        pageCount = record.book.pageCount;
    }

    const onSubmit = e => {
        e.preventDefault();
        addMarker(group._id, record._id, marker);
        handleClose();
    }

    return (
        <Fragment>
            <h3>Update Status</h3>
            <form onSubmit={onSubmit}>
                <label className='hidden' htmlFor="page">Current page</label>
                <input className='number-input' type="number" name="page" id="page" onChange={onChange} />/{pageCount}
                <input className='btn btn-yellow' type="submit" value="Update" />
            </form>
        </Fragment>
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

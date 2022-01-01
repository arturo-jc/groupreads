import React, { useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addMarker } from '../../../../../actions/markerActions';
import { setAlert } from '../../../../../actions/alertActions';

const NewMarkerForm = ({ recordState, addMarker, setAlert, handleClose }) => {

    const { current: record } = recordState;

    const {groupId, recordId} = useParams();

    const [marker, setMarker] = useState({ page: "" })

    const onChange = e => {
        setMarker({
            ...marker,
            [e.target.name]: e.target.value
        })
    }
    let pageCount = 0;
    if (record && record.book.pageCount){
        pageCount = record.book.pageCount;
    }

    const onSubmit = e => {
        e.preventDefault();
        if (!marker.page ){
            setAlert("Please enter a page number.", "danger")
        }else{
            addMarker(groupId, recordId, marker);
            setMarker({page: ""});
        }
        handleClose();
    }

    return (
        <Fragment>
            <h3>Update Status</h3>
            <form onSubmit={onSubmit}>
                <label className='hidden' htmlFor="page">Current page</label>
                <input className='number-input' type="number" name="page" id="page" value={marker.page} onChange={onChange} placeholder='0' />/{pageCount}
                <input className='btn btn-yellow' type="submit" value="Update" />
            </form>
        </Fragment>
    )
}

NewMarkerForm.propTypes = {
    addMarker: PropTypes.func.isRequired,
    recordState: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    recordState: state.record
})

const addState = connect(mapStateToProps, { addMarker, setAlert })

export default addState(NewMarkerForm)

import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addMarker } from '../../../../../actions/markerActions';
import { setAlert } from '../../../../../actions/alertActions';

const NewMarkerForm = ({ recordState, markerState, addMarker, setAlert, handleClose }) => {

    const { current: record } = recordState;
    
    const {groupId, recordId} = useParams();

    const { markers } = markerState;

    let currentPage = 0;

    useEffect(() => {
        if (markers.length > 0){
            markers.sort(function(a, b){
                return new Date(b.date) - new Date(a.date)
            });
            currentPage = markers[0].page
        }
        setMarker({page: currentPage});
    }, [markers])

    const [marker, setMarker] = useState({ page: currentPage })

    const onChange = e => {
        setMarker({
            ...marker,
            [e.target.name]: e.target.value
        })
    }

    const pageCount = record.book.pageCount;

    const onSubmit = e => {
        e.preventDefault();
        if (!marker.page ){
            setAlert("Please enter a page number.", "danger")
        }else{
            addMarker(groupId, recordId, marker);
        }
        handleClose();
    }

    return (
        <Fragment>
            <h3>Update Status</h3>
            <form onSubmit={onSubmit}>
                <label className='hidden' htmlFor="page">Current page</label>
                <input className='number-input' type="number" name="page" id="page" value={marker.page} onChange={onChange} />/{pageCount}
                <input className='btn btn-yellow' type="submit" value="Update" />
            </form>
        </Fragment>
    )
}

NewMarkerForm.propTypes = {
    addMarker: PropTypes.func.isRequired,
    markerState: PropTypes.object.isRequired,
    recordState: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    recordState: state.record,
    markerState: state.marker
})

const addState = connect(mapStateToProps, { addMarker, setAlert })

export default addState(NewMarkerForm)

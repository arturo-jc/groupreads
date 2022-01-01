import React, {useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import Spinner from '../../../../Spinner';
import ProgressBar from './ProgressBar';
import Modal from "../../../../Modal";
import PropTypes from 'prop-types';
import { getMarkersFor, addMarker } from '../../../../../actions/markerActions';
import StatusHistory from './StatusHistory';
import NewMarkerForm from './NewMarkerForm';

const Progress = ({recordState, markerState, getMarkersFor, addMarker}) => {

    const [newMarkerModal, setNewMarkerModal] = useState({show: false})
    const [statusHistoryModal, setStatusHistoryModal] = useState({show: false})

    const showNewMarkerModal = () => {
        setNewMarkerModal({
            ...newMarkerModal,
            show: true
        })
    }
    const hideNewMarkerModal = () => {
        setNewMarkerModal({
            ...newMarkerModal,
            show: false
        })
    }

    
    const showStatusHistoryModal = () => {
        setStatusHistoryModal({
            ...statusHistoryModal,
            show: true
        })
    }

    const hideStatusHistoryModal = () => {
        setStatusHistoryModal({
            ...statusHistoryModal,
            show: false
        })
    }

    const {groupId, recordId } = useParams();
    const { current } = recordState;

    useEffect(() => {
        getMarkersFor(groupId, recordId);
    }, [recordId])

    
    const { markers, loading } = markerState;

    let currentPage = 0;
    if (markers.length > 0){
        markers.sort(function(a, b){
            return new Date(b.date) - new Date(a.date)
        });
        currentPage = markers[0].page
    }

    const completed = Math.round((currentPage / current.book.pageCount) * 100);

    const markComplete = () => {
        addMarker(groupId, recordId, {page: current.book.pageCount})
    }

    if (loading){
        return <Spinner/>
    }

    return (
        <Fragment>
            <h3>Progress</h3>
            <p>{currentPage}/{current.book.pageCount} pages completed.</p>
            <div>
                <ProgressBar bgcolor={"#6a1b9a"} completed={completed}/>
                <div className="btn-group">
                <button className='btn btn-yellow' onClick={showNewMarkerModal}>Update</button>
                <button className='btn btn-green' onClick={markComplete}>Mark complete</button>
                <button className='btn btn-grey' onClick={showStatusHistoryModal}>Edit</button>
                </div>
            </div>
            <Modal show={statusHistoryModal.show} handleClose={hideStatusHistoryModal} Component={StatusHistory}/>
            <Modal show={newMarkerModal.show} handleClose={hideNewMarkerModal} Component={NewMarkerForm}/>
        </Fragment>
    )
}

Progress.propTypes = {
    recordState: PropTypes.object.isRequired,
    markerState: PropTypes.object.isRequired,
    getMarkersFor: PropTypes.func.isRequired,
    addMarker: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    recordState: state.record,
    markerState: state.marker
})

const addState = connect(mapStateToProps, { getMarkersFor, addMarker })

export default addState(Progress);
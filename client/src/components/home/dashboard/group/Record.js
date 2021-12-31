import React, {useEffect, Fragment, useState} from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Modal from "../../../Modal";
import NewPostForm from './record/NewPostForm';
import NewMarkerForm from './record/NewMarkerForm';
import NewBookmarkForm from './record/NewBookmarkForm';
import Items from './record/Items';
import ProgressBar from "./record/ProgressBar";
import StatusHistory from './record/StatusHistory';
import { setCurrentRecord } from '../../../../actions/recordActions';
import { getPostsFor } from '../../../../actions/postActions';
import { getMarkersFor } from '../../../../actions/markerActions';
import { getBookmarksFor } from '../../../../actions/bookmarkActions';
import { addMarker } from '../../../../actions/markerActions';

const Record = ({ recordState, markerState, setCurrentRecord, getMarkersFor, addMarker }) => {

    const [newMarkerModal, setNewMarkerModal] = useState({show: false})
    const [newBookmarkModal, setNewBookmarkModal] = useState({show: false})
    const [newPostModal, setNewPostModal] = useState({show: false})
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
    const showNewBookmarkModal = () => {
        setNewBookmarkModal({
            ...newBookmarkModal,
            show: true
        })
    }
    const hideNewBookmarkModal = () => {
        setNewBookmarkModal({
            ...newBookmarkModal,
            show: false
        })
    }
    const showNewPostModal = () => {
        setNewPostModal({
            ...newPostModal,
            show: true
        })
    }
    const hideNewPostModal = () => {
        setNewPostModal({
            ...newPostModal,
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

    const {groupId, recordId} = useParams();
    const { current, records } = recordState;
    const record = records.find(record => record._id === recordId);

    useEffect(() => {
        if(record){
            setCurrentRecord(record);
            getMarkersFor(groupId, record);
        }
    }, [record])

    const { markers } = markerState;

    let currentPage = 0;
    if (markers.length > 0){
        markers.sort(function(a, b){
            return new Date(b.date) - new Date(a.date)
        });
        currentPage = markers[0].page
    }

    let completed = 0;
    if (current && current.book.pageCount){
        completed = Math.round((currentPage / current.book.pageCount) * 100);
    }

    const markComplete = () => {
        addMarker(groupId, recordId, {page: current.book.pageCount})
    }

    return (
        <Fragment>
            <div className="card book-card">
                {current && <h3>{current.book.title}</h3>}
                {current && current.book.subtitle && <p>{current.book.title}</p>}
                {current && <p className='authors'>By {current.book.authors.join(", ")}</p>}
                <div className="details-row">
                    <div className="cover-col">
                        {current && <img src={current.book.imageUrl} alt="" />}
                    </div>
                    <div className="details-col">
                     {current && current.book.description && <p className='book-description'>{current.book.description}</p>}
                     {current && current.book.publisher && <p><span className='volume-info'>Publisher: </span>{current.book.publisher}</p>}
                     {current && current.book.publishedOn && <p><span className='volume-info'>Published on: </span>{current.book.publishedOn.split("T")[0]}</p>}
                     {current && current.book.industryIdentifiers && <p><span className='volume-info'>{current.book.industryIdentifiers[0].type}: </span>{current.book.industryIdentifiers[0].identifier}</p>}
                     {current && current.book.pageCount && <p><span className='volume-info'>Status: </span>
                     <button className='link-style-btn' onClick={showNewMarkerModal}>{currentPage}</button>/{current.book.pageCount} pages. (<button className='link-style-btn' onClick={showStatusHistoryModal}>See full history</button>).</p>}
                     {current && current.book.pageCount && (
                        <div className='progress-bar-container'>
                            <ProgressBar bgcolor={"#6a1b9a"} completed={completed}/>
                            <button className='btn btn-green' onClick={markComplete}>Mark complete</button>
                        </div>
                     )}
                    </div>
                </div>
                <div className='btn-group'>
                    <button className='btn btn-yellow' onClick={showNewBookmarkModal}>Add bookmark</button>
                    <button className='btn btn-green' onClick={showNewPostModal}>Write post</button>
                </div>
            </div>
            <Items/>
            <Modal show={statusHistoryModal.show} handleClose={hideStatusHistoryModal} Component={StatusHistory}/>
            <Modal show={newMarkerModal.show} handleClose={hideNewMarkerModal} Component={NewMarkerForm}/>
            <Modal show={newBookmarkModal.show} handleClose={hideNewBookmarkModal} Component={NewBookmarkForm}/>
            <Modal show={newPostModal.show} handleClose={hideNewPostModal} Component={NewPostForm}/>
        </Fragment>
    )
}

Record.propTypes = {
    recordState: PropTypes.object.isRequired,
    markerState: PropTypes.object.isRequired,
    setCurrentRecord: PropTypes.func.isRequired,
    getPostsFor: PropTypes.func.isRequired,
    getMarkersFor: PropTypes.func.isRequired,
    getBookmarksFor: PropTypes.func.isRequired,
    addMarker: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    recordState: state.record,
    markerState: state.marker
})

const addState = connect( mapStateToProps, {setCurrentRecord, getPostsFor, getMarkersFor, getBookmarksFor, addMarker});

export default addState(Record);
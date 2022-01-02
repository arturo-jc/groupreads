import React, {Fragment, useState} from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Modal from "../../../Modal";
import NewPostForm from './record/NewPostForm';
import NewBookmarkForm from './record/NewBookmarkForm';
import DeleteRecord from './record/DeleteRecord';
import BookDetails from './record/BookDetails';
import Items from './record/Items';
import Progress from './record/Progress';
import nocover from "./search/nocover.gif"

const Record = ({ groupState, recordState, authState }) => {

    const { user } = authState
    const { current: group } = groupState;
    const { current: recordDetails } = recordState;
    const { recordId } = useParams();

    let record = null;
    if (group){
        record = group.records.find(record => record._id === recordId)
    }

    const [newBookmarkModal, setNewBookmarkModal] = useState({show: false})
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

    const [newPostModal, setNewPostModal] = useState({show: false})
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

    const [deleteRecordModal, setDeleteRecordModal] = useState({show: false})
    const showDeleteRecordModal = () => {
        setDeleteRecordModal({
            ...deleteRecordModal,
            show: true
        })
    }
    const hideDeleteRecordModal = () => {
        setDeleteRecordModal({
            ...deleteRecordModal,
            show: false
        })
    }

    return (
        <Fragment>
            <div className="card book-card">
                {record && <h3>{record.book.title}</h3>}
                {record && record.book.subtitle && <p>{record.book.title}</p>}
                {record && <p className='authors'>By {record.book.authors.join(", ")}</p>}
                <div className="details-row">
                    <div className="cover-col">
                        {record && record.book.imageUrl? (<img src={record.book.imageUrl} alt="" />):(<img style={{width: 128}} src={nocover}/>)}
                    </div>
                    <div className="details-col">
                        <BookDetails/>
                    </div>
                </div>
                <div className='btn-group'>
                    <button className='btn btn-yellow' onClick={showNewBookmarkModal}>Add bookmark</button>
                    <button className='btn btn-green' onClick={showNewPostModal}>Write post</button>
                    {recordDetails && recordDetails.owner === user._id && <button className='btn btn-red' onClick={showDeleteRecordModal}>Delete book</button>}
                </div>
            </div>
            <div className='card'>
                {recordDetails && recordDetails.book.pageCount && <Progress/>}
            </div>
            <Items/>
            <Modal show={newBookmarkModal.show} handleClose={hideNewBookmarkModal} Component={NewBookmarkForm}/>
            <Modal show={newPostModal.show} handleClose={hideNewPostModal} Component={NewPostForm}/>
            <Modal show={deleteRecordModal.show} handleClose={hideDeleteRecordModal} Component={DeleteRecord}/>
        </Fragment>
    )
}

Record.propTypes = {
    groupState: PropTypes.object.isRequired,
    recordState: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group,
    recordState: state.record,
    authState: state.auth
})

const addState = connect(mapStateToProps);

export default addState(Record);
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
import nocover from "./search/nocover.gif";
import { openModal, closeModal } from '../../../../actions/modalActions';

const Record = ({ groupState, recordState, authState, openModal, closeModal }) => {

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
        openModal()
    }
    const hideNewBookmarkModal = () => {
        setNewBookmarkModal({
            ...newBookmarkModal,
            show: false
        })
        closeModal()
    }

    const [deleteRecordModal, setDeleteRecordModal] = useState({show: false})
    const showDeleteRecordModal = () => {
        setDeleteRecordModal({
            ...deleteRecordModal,
            show: true
        })
        openModal()
    }
    const hideDeleteRecordModal = () => {
        setDeleteRecordModal({
            ...deleteRecordModal,
            show: false
        })
        closeModal()
    }

    return (
        <Fragment>
            <div className="card book-card">
                {record && <h2>{record.book.title}</h2>}
                {record && record.book.subtitle && <p className='book-subtitle'>{record.book.subtitle}</p>}
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
                    {recordDetails && recordDetails.owner === user._id && <button className='btn btn-red' onClick={showDeleteRecordModal}>Delete book</button>}
                </div>
            </div>
            <div className='card'>
                {recordDetails && recordDetails.book.pageCount && <Progress/>}
            </div>
            <Items/>
            <div className='card'>
                <NewPostForm/>
            </div>
            <Modal show={newBookmarkModal.show} handleClose={hideNewBookmarkModal} Component={NewBookmarkForm}/>
            <Modal show={deleteRecordModal.show} handleClose={hideDeleteRecordModal} Component={DeleteRecord}/>
        </Fragment>
    )
}

Record.propTypes = {
    groupState: PropTypes.object.isRequired,
    recordState: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group,
    recordState: state.record,
    authState: state.auth
})

const addState = connect(mapStateToProps, {openModal, closeModal});

export default addState(Record);
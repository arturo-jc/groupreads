import React, {useEffect, Fragment, useState} from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Modal from "../../../Modal";
import NewPostForm from './record/NewPostForm';
import NewBookmarkForm from './record/NewBookmarkForm';
import DeleteRecord from './record/DeleteRecord';
import Items from './record/Items';
import Progress from './record/Progress';
import { setCurrentRecord } from '../../../../actions/recordActions';
import nocover from "./search/nocover.gif"

const Record = ({ recordState, setCurrentRecord }) => {

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

    const {recordId} = useParams();
    const { current, records } = recordState;
    const record = records.find(record => record._id === recordId);

    useEffect(() => {
        if(record){
            setCurrentRecord(record);
        }
    }, [record])
    
    return (
        <Fragment>
            <div className="card book-card">
                {current && <h3>{current.book.title}</h3>}
                {current && current.book.subtitle && <p>{current.book.title}</p>}
                {current && <p className='authors'>By {current.book.authors.join(", ")}</p>}
                <div className="details-row">
                    <div className="cover-col">
                        {current && current.book.imageUrl? (<img src={current.book.imageUrl} alt="" />):(<img style={{width: 128}} src={nocover}/>)}
                    </div>
                    <div className="details-col">
                     {current && current.book.description && <p className='book-description'>{current.book.description}</p>}
                     {current && current.book.publisher && <p><span className='volume-info'>Publisher: </span>{current.book.publisher}</p>}
                     {current && current.book.publishedOn && <p><span className='volume-info'>Published on: </span>{current.book.publishedOn.split("T")[0]}</p>}
                     {current && current.book.industryIdentifiers.length > 0 && <p><span className='volume-info'>{current.book.industryIdentifiers[0].type}: </span>{current.book.industryIdentifiers[0].identifier}</p>}
                    </div>
                </div>
                <div className='btn-group'>
                    <button className='btn btn-yellow' onClick={showNewBookmarkModal}>Add bookmark</button>
                    <button className='btn btn-green' onClick={showNewPostModal}>Write post</button>
                    <button className='btn btn-red' onClick={showDeleteRecordModal}>Delete book</button>
                </div>
            </div>
            <div className='card'>
                <Progress/>
            </div>
            <Items/>
            <Modal show={newBookmarkModal.show} handleClose={hideNewBookmarkModal} Component={NewBookmarkForm}/>
            <Modal show={newPostModal.show} handleClose={hideNewPostModal} Component={NewPostForm}/>
            <Modal show={deleteRecordModal.show} handleClose={hideDeleteRecordModal} Component={DeleteRecord}/>
        </Fragment>
    )
}

Record.propTypes = {
    recordState: PropTypes.object.isRequired,
    setCurrentRecord: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    recordState: state.record
})

const addState = connect( mapStateToProps, {setCurrentRecord });

export default addState(Record);
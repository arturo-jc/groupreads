import React, {useEffect, Fragment, useState} from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Modal from "../../../Modal";
import NewPostForm from './record/NewPostForm';
import NewMarkerForm from './record/NewMarkerForm';
import NewBookmarkForm from './record/NewBookmarkForm';
import Post from "./record/Post";
import Bookmark from './record/Bookmark';
import ProgressBar from "./record/ProgressBar";
import { setCurrentRecord } from '../../../../actions/recordActions';
import { getPostsFor } from '../../../../actions/postActions';
import { getMarkersFor } from '../../../../actions/markerActions';
import { getBookmarksFor } from '../../../../actions/bookmarkActions';

const Record = ({ recordState, postState, markerState, bookmarkState, setCurrentRecord, getPostsFor, getMarkersFor, getBookmarksFor }) => {

    const [newMarkerModal, setNewMarkerModal] = useState({show: false})
    const [newBookmarkModal, setNewBookmarkModal] = useState({show: false})
    const [newPostModal, setNewPostModal] = useState({show: false})

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

    const {groupId, recordId} = useParams();
    const { current, records } = recordState;
    const record = records.find(record => record._id === recordId);

    useEffect(() => {
        setCurrentRecord(record);
        getPostsFor(groupId, record);
        getMarkersFor(groupId, record);
        getBookmarksFor(groupId, record);
    }, [record])

    const { markers } = markerState;
    const { posts } = postState;
    const { bookmarks } = bookmarkState;

    let currentPage = 0;
    if (markers.length > 0){
        markers.sort(function(a, b){
            return new Date(b.date) - new Date(a.date)
        });
        currentPage = markers[0].page
    }
    let completed = 0;
    if (current.book.pageCount){
        completed = Math.round((currentPage / current.book.pageCount) * 100);
    }

    const items = posts.concat(bookmarks);
    items.sort(function(a, b){
        return new Date(b.date) - new Date(a.date)
    });

    return (
        <Fragment>
            <div className="card book-card">
                {current && <h3 className='book-title'>{current.book.title}</h3>}
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
                     {current && current.book.pageCount && <p><span className='volume-info'>Status: </span><button className='link-style-btn' onClick={showNewMarkerModal}>{currentPage}</button>/{current.book.pageCount} pages. (<button className='link-style-btn'>See full history</button>).</p>}
                     {current && current.book.pageCount && (<ProgressBar bgcolor={"#6a1b9a"} completed={completed}/>)}
                    </div>
                </div>
                <Modal show={newMarkerModal.show} handleClose={hideNewMarkerModal} Component={NewMarkerForm}/>
                <button className='btn btn-yellow' onClick={showNewBookmarkModal}>Add bookmark</button>
                <Modal show={newBookmarkModal.show} handleClose={hideNewBookmarkModal} Component={NewBookmarkForm}/>
                <button className='btn btn-green' onClick={showNewPostModal}>Write post</button>
                <Modal show={newPostModal.show} handleClose={hideNewPostModal} Component={NewPostForm}/>
            </div>
            {items && (items.map(item => item.title? (<Post key={item._id} post={item}/>):(<Bookmark key={item._id} bookmark={item}/>)))}
        </Fragment>
    )
}

Record.propTypes = {
    recordState: PropTypes.object.isRequired,
    postState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    recordState: state.record,
    postState: state.post,
    markerState: state.marker,
    bookmarkState: state.bookmark
})

const addState = connect( mapStateToProps, {setCurrentRecord, getPostsFor, getMarkersFor, getBookmarksFor});

export default addState(Record);
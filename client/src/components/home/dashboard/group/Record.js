import React, {useEffect, Fragment, useState} from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import NewPostForm from './record/NewPostForm';
import NewMarkerForm from './record/NewMarkerForm';
import NewBookmarkForm from './record/NewBookmarkForm';
import Modal from "../../../Modal";
import Post from "./record/Post";
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

    const { posts } = postState;
    const { markers } = markerState;
    const { bookmarks } = bookmarkState;

    return (
        <Fragment>
            <div className="card">
                {current && <h3>{current.book.title}</h3>}
                {current && <p>By {current.book.authors.join(", ")}</p>}
                {current && <img src={current.book.imageUrl} alt="" />}
                {current && current.startedOn ? (<p>Started on {current.startedOn}</p>) : (<p>Not started</p>)}
                {current && current.finishedOn ? (<p>Finished on {current.finishedOn}</p>) : (<p>Not finished</p>)}
                <button onClick={showNewMarkerModal}>Mark progress</button>
                <Modal show={newMarkerModal.show} handleClose={hideNewMarkerModal} Component={NewMarkerForm}/>
                <button onClick={showNewBookmarkModal}>Add bookmark</button>
                <Modal show={newBookmarkModal.show} handleClose={hideNewBookmarkModal} Component={NewBookmarkForm}/>
                <button onClick={showNewPostModal}>Write post</button>
                <Modal show={newPostModal.show} handleClose={hideNewPostModal} Component={NewPostForm}/>
            </div>
            {!markers || markers.length === 0 ?
                (<p>You don't have any markers yet</p>)
                :
                (markers.map(marker => <p key={marker._id}>{marker.page}</p>))
            }

            {!bookmarks || bookmarks.length === 0 ?
                (<p>You don't have any bookmarks yet</p>)
                :
                (bookmarks.map(bookmark => <p key={bookmark._id}>{bookmark.body}</p>))
            }
            {!posts || posts.length === 0 ?
                (<p>You don't have any posts yet</p>)
                :
                (posts.map(post => <Post key={post._id} post={post} />))
            }
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
import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import AddPostForm from './record/AddPostForm';
import AddMarkerForm from './record/AddMarkerForm';
import AddBookmarkForm from './record/AddBookmarkForm';
import Post from "./record/Post";
import { setCurrentRecord } from '../../../actions/recordActions';
import { getPostsFor } from '../../../actions/postActions';
import { getMarkersFor } from '../../../actions/markerActions';
import { getBookmarksFor } from '../../../actions/bookmarkActions';

const Record = ({ recordState, postState, markerState, bookmarkState, setCurrentRecord, getPostsFor, getMarkersFor, getBookmarksFor }) => {

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
        <div>
            {current && <h1>{current.book.title}</h1>}
            {current && <p>By {current.book.authors.join(", ")}</p>}
            {current && <img src={current.book.imageUrl} alt="" />}
            {current && current.startedOn ? (<p>Started on {current.startedOn}</p>) : (<p>Not started</p>)}
            {current && current.finishedOn ? (<p>Finished on {current.finishedOn}</p>) : (<p>Not finished</p>)}
            <AddMarkerForm />
            {!markers || markers.length === 0 ?
                (<p>You don't have any markers yet</p>)
                :
                (markers.map(marker => <p key={marker._id}>{marker.page}</p>))
            }

            <AddBookmarkForm />
            {!bookmarks || bookmarks.length === 0 ?
                (<p>You don't have any bookmarks yet</p>)
                :
                (bookmarks.map(bookmark => <p key={bookmark._id}>{bookmark.body}</p>))
            }
            <AddPostForm />
            {!posts || posts.length === 0 ?
                (<p>You don't have any posts yet</p>)
                :
                (posts.map(post => <Post key={post._id} post={post} />))
            }
        </div>
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
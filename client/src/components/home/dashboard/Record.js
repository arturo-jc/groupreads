import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import AddPostForm from './record/AddPostForm';
import AddMarkerForm from './record/AddMarkerForm';
import Post from "./record/Post"

const Record = ({ recordState, postState, markerState }) => {

    const { current } = recordState;
    const { posts } = postState;
    const { markers } = markerState;
    const { title, authors, imageUrl } = current.book;
    const { startedOn, finishedOn } = current;

    return (
        <div>
            <h1>{title}</h1>
            <p>By {authors.join(", ")}</p>
            <img src={imageUrl} alt="" />
            {startedOn ? (<p>Started on {startedOn}</p>) : (<p>Not started</p>)}
            {finishedOn ? (<p>Finished on {finishedOn}</p>) : (<p>Not finished</p>)}
            <AddMarkerForm />
            {!markers || markers.length === 0 ?
                (<p>You don't have any markers yet</p>)
                :
                (markers.map(marker => <p key={marker._id}>{marker.page}</p>))
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
    markerState: state.marker
})

const addState = connect(mapStateToProps);

export default addState(Record);
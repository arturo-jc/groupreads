import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import AddPostForm from './record/AddPostForm';
import Post from "./record/Post"

const Record = ({ recordState, postState }) => {

    const { current, loading } = recordState;
    const { posts } = postState;
    const { title, authors, imageUrl } = current.book;
    const { startedOn, finishedOn } = current;

    return (
        <div>
            <h1>{title}</h1>
            <p>By {authors.join(", ")}</p>
            <img src={imageUrl} alt="" />
            {startedOn ? (<p>Started on {startedOn}</p>) : (<p>Not started</p>)}
            {finishedOn ? (<p>Finished on {finishedOn}</p>) : (<p>Not finished</p>)}
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
    postState: state.post
})

const addState = connect(mapStateToProps);

export default addState(Record);
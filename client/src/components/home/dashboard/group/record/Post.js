import React from 'react'
import PropTypes from 'prop-types'
import Comments from './post/Comments';
import AddCommentForm from "./post/AddCommentForm"

const Post = ({ post }) => {
    const { title, body, author, comments } = post;
    return (
        <div>
            <p>{author.name} posted: </p>
            <p>{title}</p>
            <p>{body}</p>
            <Comments postId={post._id} comments={comments} />
            <AddCommentForm postId={post._id} />
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired
}

export default Post;
import React from 'react'
import PropTypes from 'prop-types'
import Comments from './post/Comments';
import AddCommentForm from "./post/AddCommentForm"

const Post = ({ post }) => {
    const { title, body, author, date, comments } = post;
    return (
        <div className='card post'>
            <h3>{title}</h3>
            <p className='post-author'>Posted by {author.name} on {date.split("T")[0]}</p>
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
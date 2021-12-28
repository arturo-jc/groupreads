import React from 'react';
import PropTypes from 'prop-types';

const Comments = ({ comments }) => {
    return (comments.map(comment => (
        <div key={comment._id}>
            <p>{comment.author.name} commented:</p>
            <p>{comment.body}</p>
        </div>
    ))
    )
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default Comments
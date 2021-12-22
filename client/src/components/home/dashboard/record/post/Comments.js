import React from 'react';
import PropTypes from 'prop-types';

const Comments = ({ comments }) => {
    return (comments.map(comment => (
        <div>
            <p>{comment.author.name} commented:</p>
            <p>{comment.body}</p>
        </div>
    ))
    )
}

Comments.propTypes = {
    comments: PropTypes.object.isRequired
}

export default Comments
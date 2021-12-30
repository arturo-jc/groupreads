import React from 'react';
import PropTypes from 'prop-types'

const Bookmark = ({bookmark}) => {
    return (
        <div className='card bookmark'>
            <p>
            <i className="fas fa-bookmark fa-lg"></i> {bookmark.addedBy.name} added a bookmark on page {bookmark.page}: {bookmark.body}
            </p>
        </div>
    )
}

Bookmark.propTypes = {
    bookmark: PropTypes.object.isRequired
}

export default Bookmark;
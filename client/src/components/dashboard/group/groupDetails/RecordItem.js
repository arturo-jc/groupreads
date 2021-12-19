import React from 'react'

const RecordItem = ({ record }) => {
    const { title, authors, imageUrl } = record.book;
    return (
        <div>
            <img src={imageUrl} alt="" />
            <p>{title}</p>
            {authors && <p>By {authors.join(", ")}</p>}
        </div>
    )
}

export default RecordItem;
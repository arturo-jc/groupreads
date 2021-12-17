import React from 'react'
import Records from './Records';

const RecordItem = ({ record }) => {
    const { title, authors, imageUrl } = record.book;
    // const { addedOn, finishedOn } = record;
    return (
        <div>
            <img src={imageUrl} alt="" />
            <p>{title}</p>
            {authors && <p>By {authors.join(", ")}</p>}
        </div>
    )
}

export default RecordItem;
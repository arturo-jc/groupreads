import React, {Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Group = ({group}) => {
    const [bookLinks, setBookLinks] = useState({show: true})
    const toggleBookLinks = () => {
        setBookLinks({show: !bookLinks.show})
    }
    const maxCharacters = 15
    
    return (
        <div className='group-menu'>
            <p>
            <button onClick={toggleBookLinks} className='toggle-book-links'><i className={bookLinks.show ? "fas fa-arrow-alt-circle-down" : "fas fa-arrow-circle-right"}></i></button>
            </p>
            <div className="menu-items">
                <Link className='group-link' to={`/groups/${group._id}`} key={group._id}>
                    {group.name.length > maxCharacters ? (`${group.name.slice(0, maxCharacters)}...`):(group.name)}
                </Link>
                <div className={`record-links ${!bookLinks.show && "hidden"}`}>
                {group.records.map(record => 
                    <Link className='record-link' key={record._id} to={`/groups/${group._id}/records/${record._id}`}>
                        <i className='fas fa-book'></i> 
                        {record.book.title.length > maxCharacters ? (`${record.book.title.slice(0, maxCharacters)}...`):(record.book.title)}
                    </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

Group.propTypes = {
    group: PropTypes.object.isRequired
}

export default Group

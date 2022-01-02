import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const Requests = ({ title, requests }) => {
    return (
        <div className='requests'>
            <h3>{title}</h3>
            {requests.map(user => (<User key={user._id} user={user} showButtons={true}/>))}
        </div>
    )
}

Requests.propTypes = {
    title: PropTypes.string.isRequired,
    requests: PropTypes.array.isRequired
}

export default Requests;
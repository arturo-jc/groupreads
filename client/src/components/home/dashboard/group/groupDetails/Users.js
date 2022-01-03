import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import User from './User';

const Users = ({ title, users, showButtons = false, handleClose }) => {
    return (
        <Fragment>
            <h3>{title}</h3>
            <div className={`users ${users.length > 0 && users.length < 3 && `users-${users.length}`}`}>
                {users.map(user => (<User key={user._id} user={user} showButtons={showButtons} handleClose={handleClose}/>))}
            </div>
        </Fragment>
    )
}

Users.propTypes = {
    title: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired
}

export default Users;
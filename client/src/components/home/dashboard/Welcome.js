import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Welcome = ({authState}) => {
    const { user } = authState
    return (
        <div className='card'>
            {user && <h2>Welcome, {user.name} </h2>}
            <div className='get-started'>
                <p>To get started, simply create a new group and start adding books to it.</p>
                <p>GroupReads is more fun with friends, so once you create a group, make sure to invite your friends so you can all discuss your favorite books together.</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    authState: state.auth
})

Welcome.propTypes = {
    authState: PropTypes.object.isRequired
}

const addState = connect(mapStateToProps)

export default addState(Welcome);

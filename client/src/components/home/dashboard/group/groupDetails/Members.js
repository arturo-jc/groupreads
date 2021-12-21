import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const Members = ({ groupState }) => {
    const { loading } = groupState
    const { members } = groupState.current;

    if (loading) {
        return (<p>Loading...</p>)
    }

    return (
        <div>
            <h5>Members</h5>
            {members.map(member => (<p key={member._id}>{member.name}</p>))}
            <a href="#">Add members</a>
        </div>
    )
}

Members.propTypes = {
    groupState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps)

export default addState(Members);
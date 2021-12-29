import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const Members = ({ groupState }) => {

    return (
        <div className='card'>
            <h3>Members</h3>
            {groupState.current && groupState.current.members.map(member => (<p key={member._id}>{member.name}</p>))}
            <button className="btn btn-yellow">Add members</button>
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
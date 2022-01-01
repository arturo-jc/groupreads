import React, {Fragment} from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const Members = ({ groupState }) => {

    return (
        <Fragment>
            <h3>Members</h3>
            {groupState.current && groupState.current.members.map(member => (<p key={member._id}>{member.name}</p>))}
        </Fragment>
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
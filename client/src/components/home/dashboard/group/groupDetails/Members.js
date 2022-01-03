import React, {Fragment} from 'react';
import User from "./User"
import PropTypes from 'prop-types';

const Members = ({ members }) => {
    return (
        <Fragment>
            <h3>Members</h3>
            {members.map(member => (<User key={member._id} user={member} />))}
        </Fragment>
    )
}

Members.propTypes = {
    members: PropTypes.array.isRequired
}

export default Members;
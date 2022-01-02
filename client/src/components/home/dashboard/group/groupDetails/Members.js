import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const Members = ({ members }) => {
    return (
        <Fragment>
            <h3>Members</h3>
            {members.map(member => (<p key={member._id}>{member.name}</p>))}
        </Fragment>
    )
}

Members.propTypes = {
    members: PropTypes.array.isRequired
}

export default Members;
import React, {Fragment} from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Group = ({group}) => {
    return (
        <Fragment>
            <Link to={`/groups/${group._id}`} key={group._id}>
                {group.name}
            </Link>
            {group.records.map(record => 
                <Link className='record-link' key={record._id} to={`/groups/${group._id}/records/${record._id}`}>{record.book.title}</Link>
                )}
        </Fragment>
    )
}

Group.propTypes = {
    group: PropTypes.object.isRequired
}

export default Group

import React, { Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types'


const Group = ({ groupState }) => {
    const { groups } = groupState;
    const { groupId } = useParams();
    const group = groups.filter(group => group._id === groupId)[0]
    return (
        <Fragment>
            <h1>{group.name}</h1>
            <h5>Members</h5>
            {group.members.map(member => (<p key={member._id}>{member.name}</p>))}
            <a href="#">Add members</a>
            <h5>Books</h5>
            {group.records.length ?
                (group.records.map(record => (<p key={record._id}>{record._id}</p>)))
                :
                (<p>This group has no books yet.</p>)}
            <Link to="/dashboard/search">Add books</Link>

        </Fragment>
    )
}

const mapStateToProps = state => ({
    groupState: state.group
});

Group.propTypes = {
    groupState: PropTypes.object.isRequired
}

const connection = connect(mapStateToProps);

export default connection(Group);
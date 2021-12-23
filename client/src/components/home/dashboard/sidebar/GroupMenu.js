import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { setCurrentGroup } from '../../../../actions/groupActions';
import { getRecordsFor } from '../../../../actions/recordActions';
import AddGroupForm from './AddGroupForm';
import SearchGroupForm from "./SearchGroupForm";

const GroupMenu = ({ groupState, setCurrentGroup, getRecordsFor }) => {

    const { groups, loading, searchResult } = groupState;

    if (loading) {
        return (<p>Loading...</p>)
    }

    const onClick = group => {
        setCurrentGroup(group);
        getRecordsFor(group);
    }

    return (
        <div>
            <h4>Groups</h4>
            {!groups || groups.length === 0 ?
                (<p>You don't have any groups yet</p>)
                :
                (groups.map(group =>
                    <Link
                        to={`/groups/${group._id}`}
                        key={group._id}
                        onClick={() => onClick(group)}>
                        {group.name}
                    </Link>))
            }
            <h5>Create group</h5>
            <AddGroupForm />
            <h5>Find group by ID</h5>
            <SearchGroupForm />
            {searchResult && <p>{searchResult.name}</p>}
        </div>
    )
};

GroupMenu.propTypes = {
    groupState: PropTypes.object.isRequired,
    setCurrentGroup: PropTypes.func.isRequired,
    getRecordsFor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps, { setCurrentGroup, getRecordsFor });

export default addState(GroupMenu);
import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import AddGroupForm from './AddGroupForm';
import SearchGroupForm from "./SearchGroupForm";

const GroupMenu = ({ groupState  }) => {

    const { groups, loading, searchResult } = groupState;

    if (loading) {
        return (<p>Loading...</p>)
    }

    return (
        <div>
            <h3>Groups</h3>
            {!groups || groups.length === 0 ?
                (<p>You don't have any groups yet</p>)
                :
                (groups.map(group =>
                    <Link to={`/groups/${group._id}`} key={group._id}>
                        {group.name}
                    </Link>))
            }
            <h3>Create group</h3>
            <AddGroupForm />
            <h3>Find group by ID</h3>
            <SearchGroupForm />
            {searchResult && <p>{searchResult.name}</p>}
        </div>
    )
};

GroupMenu.propTypes = {
    groupState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps);

export default addState(GroupMenu);
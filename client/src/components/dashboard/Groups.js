import React, { useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { setCurrentGroup, getGroups } from "../../actions/groupActions";
import AddGroupForm from './AddGroupForm';

const Groups = ({ groupState, setCurrentGroup, getGroups }) => {

    useEffect(() => {
        getGroups();
    }, [])

    const { groups, loading } = groupState;

    return (
        <div>
            <h4>Groups</h4>
            {!loading && !groups ?
                (<p>You don't have any groups yet</p>)
                :
                (groups.map(group =>
                    <Link
                        to={`groups/${group._id}`}
                        key={group._id}
                        onClick={() => setCurrentGroup(group)}>
                        {group.name}
                    </Link>))
            }
            <AddGroupForm />
        </div>
    )
};

Groups.propTypes = {
    groupState: PropTypes.object.isRequired,
    getGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps, { setCurrentGroup, getGroups });

export default addState(Groups);
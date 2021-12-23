import React, { useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Routes, Route, useParams } from 'react-router-dom';
import GroupDetails from './group/GroupDetails';
import Search from './group/Search';
import { setCurrentGroup } from '../../../actions/groupActions';
import { getRecordsFor } from '../../../actions/recordActions';

const Group = ({ groupState, setCurrentGroup, getRecordsFor }) => {
    const { current, loading, groups } = groupState;
    const { groupId } = useParams();
    const group = groups.find(group => group._id === groupId);

    useEffect(() => {
        setCurrentGroup(group);
    }, [])

    return (
    <div>
        {current && <h1>{current.name}</h1>}
        <Routes>
                <Route path="" element={<GroupDetails />} />
                <Route path="/search" element={<Search />} />
            </Routes>
    </div>
    )
}

Group.propTypes = {
    groupState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group,
});

const addState = connect(mapStateToProps, { setCurrentGroup, getRecordsFor });

export default addState(Group);
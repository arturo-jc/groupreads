import React, { useEffect, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Routes, Route, useParams } from 'react-router-dom';
import GroupDetails from './group/GroupDetails';
import Search from './group/Search';
import Record from './group/Record';
import { setCurrentGroup } from '../../../actions/groupActions';
import { getRecordsFor } from '../../../actions/recordActions';

const Group = ({ groupState, setCurrentGroup, getRecordsFor }) => {
    
    const { groupId } = useParams();
    const { current, groups } = groupState;
    const group = groups.find(group => group._id === groupId);

    useEffect(() => {
        setCurrentGroup(group);
        getRecordsFor(group);
    }, [group])

    return (
    <Fragment>
        {current && <h2>{current.name}</h2>}
        <Routes>
                <Route path="" element={<GroupDetails />} />
                <Route path="/search" element={<Search />} />
                <Route path="/records/:recordId/*" element={<Record />} />
            </Routes>
    </Fragment>
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
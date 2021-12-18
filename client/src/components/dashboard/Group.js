import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import GroupDetails from './group/GroupDetails';
import Search from './group/Search';

const Group = ({ groupState }) => {
    const { current, loading } = groupState;

    if (loading) {
        return (<p>Loading...</p>)
    }

    return (
        <div>
            <h1>{current.name}</h1>
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

const addState = connect(mapStateToProps);

export default addState(Group);
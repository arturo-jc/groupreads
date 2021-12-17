import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';
import GroupDetails from './GroupDetails';
import SearchBooks from './SearchBooks';

const Group = ({ groupState }) => {
    const { current } = groupState;
    return (
        <div>
            <h1>{current.name}</h1>
            <Routes>
                <Route path="" element={<GroupDetails />} />
                <Route path="/search" element={<SearchBooks />} />
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
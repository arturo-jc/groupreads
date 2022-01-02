import React, { useEffect, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Routes, Route, useParams } from 'react-router-dom';
import GroupDetails from './group/GroupDetails';
import Search from './group/Search';
import Record from './group/Record';
import { setCurrentGroup } from '../../../actions/groupActions';

const Group = ({ groupState, setCurrentGroup }) => {
    
    const { groupId } = useParams();
    const { current, groups } = groupState;
    let group = null
    if (groups){
        group = groups.find(group => group._id === groupId);
    }

    useEffect(() => {
        if(group){
            setCurrentGroup(group);
        }
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
    groupState: PropTypes.object.isRequired,
    setCurrentGroup: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group,
});

const addState = connect(mapStateToProps, { setCurrentGroup });

export default addState(Group);
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Sidebar from '../dashboard/Sidebar';
import Group from '../dashboard/Group';
import { Routes, Route } from 'react-router-dom';
import { getGroups } from '../../actions/groupActions';

const Dashboard = ({ getGroups }) => {

    useEffect(() => {
        getGroups();
    }, [])

    return (
        <div>
            <Sidebar />
            <Routes>
                <Route path="/" element={<p>Recent activity</p>} />
                <Route path="/groups/:groupId/*" element={<Group />} />
            </Routes>
        </div>
    )
}

const addState = connect(null, { getGroups, getGroups })

export default addState(Dashboard);
import React, { useEffect, Fragment } from 'react';
import { connect } from "react-redux";
import Sidebar from './dashboard/Sidebar';
import Group from './dashboard/Group';
import { Routes, Route } from 'react-router-dom';
import { getGroups } from '../../actions/groupActions';

const Dashboard = ({ getGroups }) => {

    useEffect(() => {
        getGroups();
    }, [])

    return (
        <Fragment>
            <Sidebar/>
            <main>
                    <Routes>
                        <Route path="/" element={<p>Recent activity</p>} />
                        <Route path="/groups/:groupId/*" element={<Group />} />
                        <Route path="/*" element={<p>Sorry, that page does not exist</p>} />
                    </Routes>
            </main>
        </Fragment>
    )
}

const addState = connect(null, { getGroups, getGroups })

export default addState(Dashboard);
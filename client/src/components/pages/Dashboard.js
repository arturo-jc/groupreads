import React, { Fragment } from 'react'
import Sidebar from '../dashboard/Sidebar';
import Group from '../dashboard/Group';
import SearchBooks from "../dashboard/SearchBooks";
import { Routes, Route } from 'react-router-dom';

const Dashboard = () => {
    return (
        <Fragment>
            <div>
                <Sidebar />
                <Routes>
                    <Route path="/groups/:groupId" element={<Group />} />
                    <Route path="/search" element={<SearchBooks />} />
                </Routes>
            </div>


        </Fragment>
    )
}

export default Dashboard;
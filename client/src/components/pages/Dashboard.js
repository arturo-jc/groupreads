import React from 'react'
import Sidebar from '../dashboard/Sidebar';
import Group from '../dashboard/Group';
import { Routes, Route } from 'react-router-dom';

const Dashboard = () => {
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

export default Dashboard;
import React, { Fragment } from 'react'
import Sidebar from '../dashboard/Sidebar';
import Group from '../dashboard/Group';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Dashboard = () => {
    return (
        <Fragment>
            {/* <Sidebar /> */}
            <div>
                <Sidebar />
                <Routes>
                    <Route path="/viewgroup" element={<Group />} />
                </Routes>
            </div>


        </Fragment>
    )
}

export default Dashboard;
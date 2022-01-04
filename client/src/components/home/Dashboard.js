import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Sidebar from './dashboard/Sidebar';
import Group from './dashboard/Group';
import Welcome from './dashboard/Welcome';
import Account from './dashboard/Account';
import { Routes, Route } from 'react-router-dom';
import { getGroups } from '../../actions/groupActions';

const Dashboard = ({ getGroups }) => {

    useEffect(() => {
        getGroups();
    }, [])

    return (
        <div className='wrapper'>
            <div className='dashboard'>
                <Sidebar/>
                <main>
                        <Routes>
                            <Route path="/" element={<Welcome/>} />
                            <Route path="/account" element={<Account/>}/>
                            <Route path="/groups/:groupId/*" element={<Group />} />
                            <Route path="/*" element={<p>Sorry, that page does not exist</p>} />
                        </Routes>
                </main>
            </div>
        </div>
    )
}

const addState = connect(null, { getGroups, getGroups })

export default addState(Dashboard);
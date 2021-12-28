import React from 'react';
import GroupMenu from "./sidebar/GroupMenu";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-card">
                <GroupMenu />
            </div>
        </div>
    )
}

export default Sidebar
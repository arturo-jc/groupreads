import React from 'react';
import Groups from "./Groups";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <Groups />
            <Link to="viewgroup">View group page</Link>
        </div>
    )
}

export default Sidebar
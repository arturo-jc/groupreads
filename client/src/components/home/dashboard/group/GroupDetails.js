import React from 'react';
import Members from './groupDetails/Members';
import Records from './groupDetails/Records';

const GroupDetails = () => {
    return (
        <div>
            <div className="card">
                <Members />
            </div>
            <div className="card">
                <Records />
            </div>
        </div>
    )
}

export default GroupDetails;
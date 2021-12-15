import React, { Fragment } from 'react'

const Groups = () => {

    // Provisional, these will become props mapped from state
    const groups = ["My group", "Another group"];
    const loading = false;

    return (
        <div>
            <h4>Groups</h4>
            {!loading && groups.length === 0 ?
                (<Fragment>
                    <p>You don't have any groups yet</p>
                    <p>Create group</p>
                    <p>Join group</p>
                </Fragment>)
                :
                (groups.map(group => <p>{group}</p>))
            }
        </div>
    )
}

export default Groups
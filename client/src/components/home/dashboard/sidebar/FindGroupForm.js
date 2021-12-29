import React, { useState, Fragment } from 'react';
import { connect } from "react-redux";
import { findGroup } from "../../../../actions/groupActions"

export const FindGroupForm = ({ groupState, findGroup }) => {

    const [group, setGroup] = useState({ _id: "" });

    const onChange = e => {
        setGroup({
            ...group,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        findGroup(group._id)
    }

    const { searchResult } = groupState;

    return (
        <Fragment>
        <h3>Find Group By ID</h3>
        <form onSubmit={onSubmit}>
            <label className='hidden' htmlFor="_id">Group Id</label>
            <input className='form-input' type="text" id="_id" name="_id" value={group._id} onChange={onChange} placeholder='Group ID'/>
            <input className='btn btn-yellow' type="submit" value="Find" />
        </form>
        {searchResult && <p>{searchResult.name}</p>}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps, { findGroup })

export default addState(FindGroupForm);
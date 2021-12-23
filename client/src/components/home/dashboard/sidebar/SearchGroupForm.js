import React, { useState } from 'react';
import { connect } from "react-redux";
import { findGroup } from "../../../../actions/groupActions"

export const SearchGroupForm = ({ findGroup }) => {

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

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="_id">Group Id</label>
            <input type="text" id="_id" name="_id" value={group._id} onChange={onChange} />
            <input type="submit" value="Search" />
        </form>
    )
}

const addState = connect(null, { findGroup })

export default addState(SearchGroupForm);
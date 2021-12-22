import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { createGroup, setCurrentGroup } from '../../../../actions/groupActions';
import { getRecordsFor } from '../../../../actions/recordActions';
import { useNavigate } from 'react-router-dom';

const AddGroupForm = ({ createGroup, setCurrentGroup, getRecordsFor }) => {

    // Form state
    const [group, setGroup] = useState({ name: "" });

    // Control form state
    const onChange = e => {
        setGroup({
            ...group,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        const newGroup = await createGroup(group);
        if (newGroup) {
            setCurrentGroup(newGroup);
            getRecordsFor(newGroup);
            navigate(`/groups/${newGroup._id}`);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Group's name</label>
            <input type="text" id="name" name="name" value={group.name} onChange={onChange} />
            <input type="submit" value="Add group" />
        </form>
    )
}

AddGroupForm.propTypes = {
    createGroup: PropTypes.func.isRequired,
    setCurrentGroup: PropTypes.func.isRequired,
    getRecordsFor: PropTypes.func.isRequired
}

const connection = connect(null, { createGroup, setCurrentGroup, getRecordsFor })

export default connection(AddGroupForm);
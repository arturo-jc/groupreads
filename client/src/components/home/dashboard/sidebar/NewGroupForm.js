import React, { useState, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { createGroup, setCurrentGroup } from '../../../../actions/groupActions';
import { getRecordsFor } from '../../../../actions/recordActions';
import { useNavigate } from 'react-router-dom';

const NewGroupForm = ({ createGroup, setCurrentGroup, getRecordsFor, handleClose }) => {

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
            handleClose();
        }
    }

    return (
        <Fragment>
        <h3>Create New Group</h3>
        <form onSubmit={onSubmit}>
            <label className='hidden' htmlFor="name">Group's name</label>
            <input className='form-input' type="text" id="name" name="name" value={group.name} onChange={onChange} placeholder="New group's name" />
            <input className='btn btn-yellow' type="submit" value="Create" />
        </form>
        </Fragment>
    )
}

NewGroupForm.propTypes = {
    createGroup: PropTypes.func.isRequired,
    setCurrentGroup: PropTypes.func.isRequired,
    getRecordsFor: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

const connection = connect(null, { createGroup, setCurrentGroup, getRecordsFor })

export default connection(NewGroupForm);
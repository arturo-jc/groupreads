import React, { useState, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { createGroup, setCurrentGroup } from '../../../../actions/groupActions';
import { setAlert } from '../../../../actions/alertActions';
import { useNavigate } from 'react-router-dom';

const NewGroupForm = ({ createGroup, setCurrentGroup, handleClose, setAlert }) => {

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
        if (group.name === ""){
            setAlert("Please enter a name for your group.", "danger")
        } else{
            const newGroup = await createGroup(group);
            if (newGroup) {
                setGroup({name: ""});
                setCurrentGroup(newGroup);
                navigate(`/groups/${newGroup._id}`);
            }
        }
        handleClose();
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
    handleClose: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
}

const connection = connect(null, { createGroup, setCurrentGroup, setAlert })

export default connection(NewGroupForm);
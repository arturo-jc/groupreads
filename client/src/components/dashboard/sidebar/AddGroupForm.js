import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { createGroup, setCurrentGroup } from "../../../actions/groupActions";
import { useNavigate } from 'react-router-dom';

const AddGroupForm = ({ groupState, createGroup }) => {
    const [group, setGroup] = useState({ name: "" });
    const { name } = group;

    const onChange = e => {
        setGroup({
            ...group,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        // const newGroup = await createGroup(group);
        // await setCurrentGroup(newGroup);
        const newGroup = await createGroup(group);
        navigate(`/dashboard/groups/${newGroup._id}`);
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="name"></label>
            <input type="submit" value="Add group" />
            <input type="text" id="name" name="name" value={name} onChange={onChange} />
        </form>
    )
}

AddGroupForm.propTypes = {
    createGroup: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group
})

const connection = connect(mapStateToProps, { createGroup, setCurrentGroup })

export default connection(AddGroupForm);
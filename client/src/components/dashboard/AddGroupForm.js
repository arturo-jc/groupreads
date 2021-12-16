import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { createGroup } from "../../actions/groupActions";

const AddGroupForm = ({ createGroup }) => {
    const [group, setGroup] = useState({ name: "" });
    const { name } = group;

    const onChange = e => {
        setGroup({
            ...group,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        createGroup(group);
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="name"></label>
            <input type="text" id="name" name="name" value={name} onChange={onChange} />
            <input type="submit" value="Submit" />
        </form>
    )
}

AddGroupForm.propTypes = {
    createGroup: PropTypes.func.isRequired
}

const connection = connect(null, { createGroup })

export default connection(AddGroupForm);
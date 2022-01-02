import React, { useState, Fragment } from 'react';
import { connect } from "react-redux";
import { findGroup } from "../../../../actions/groupActions";
import { setAlert } from '../../../../actions/alertActions';
import PropTypes from 'prop-types';
import Result from "./Result";

export const FindGroupForm = ({ groupState, findGroup, setAlert, handleClose }) => {

    const [group, setGroup] = useState({ _id: "" });

    const onChange = e => {
        setGroup({
            ...group,
            [e.target.name]: e.target.value
        })
    }

    const { searchResult } = groupState;

    const onSubmit = e => {
        e.preventDefault();
        if (group._id === ""){
            setAlert("Please enter an ID.", "danger");
            handleClose();
        } else{
            findGroup(group._id)
        }
    }

    if (searchResult){
        return <Result result={searchResult} handleClose={handleClose}/>
    }

    return (<Fragment>
            <h3>Find Group By ID</h3>
            <form onSubmit={onSubmit}>
                <label className='hidden' htmlFor="_id">Group Id</label>
                <input className='form-input' type="text" id="_id" name="_id" value={group._id} onChange={onChange} placeholder='Group ID'/>
                <input className='btn btn-yellow' type="submit" value="Find" />
            </form>
            </Fragment>)

}

FindGroupForm.propTypes = {
    groupState: PropTypes.object.isRequired,
    findGroup: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps, { findGroup, setAlert })

export default addState(FindGroupForm);
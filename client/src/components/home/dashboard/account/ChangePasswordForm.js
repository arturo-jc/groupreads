import React, {Fragment, useState} from 'react'
import { connect } from "react-redux";
import { changePasswords } from '../../../../actions/authActions';
import { setAlert } from '../../../../actions/alertActions';
import PropTypes from 'prop-types';

const ChangePasswordForm = ({authState, changePasswords, setAlert, handleClose }) => {
    const { user } = authState;
    const [passwords, setPasswords] = useState({
        current: "",
        password: "",
        password2: ""
    })

    const { current, password, password2 } = passwords;

    const onChange = e => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (current === "" || password === "" || password2 === "") {
            setAlert("Please enter all fields", "danger");
        } else if (password !== password2) {
            setAlert("Passwords do not match", "danger");
        } else {
            changePasswords(user._id, passwords)
            setPasswords({
                current: "",
                password: "",
                password2: ""
            })
            handleClose();
        }
    }

    return (
        <Fragment>
            <h3>Change Password</h3>
            <form onSubmit={onSubmit}>
                <label className='hidden' htmlFor="current">Current password</label>
                <input className='form-input' type="password" name="current" id="current" value={current} onChange={onChange} placeholder='Current password'/>
                <label className='hidden' htmlFor="password">New password</label>
                <input className='form-input' type="password" name="password" id="password" value={password} onChange={onChange} placeholder='New password'/>
                <label className='hidden' htmlFor="password2">Confirm new password</label>
                <input className='form-input' type="password" name="password2" id="password2" value={password2} onChange={onChange} placeholder='Confirm new password'/>
                <input className='btn btn-yellow' type="submit" value="Change" />
            </form>
        </Fragment>
    )
}

ChangePasswordForm.propTypes = {
    authState: PropTypes.object.isRequired,
    changePasswords: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth
})

const addState = connect(mapStateToProps, {changePasswords, setAlert});
export default addState(ChangePasswordForm)

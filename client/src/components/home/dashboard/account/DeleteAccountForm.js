import React, {Fragment, useState} from 'react';
import { deleteAccount } from '../../../../actions/authActions';
import { connect } from 'react-redux';

const DeleteAccountForm = ({authState, handleClose, deleteAccount}) => {

    const { user } = authState;

    const [proceed, setProceed] = useState(false)
    const [password, setPassword] = useState({current: ""})

    const cancel = () => {
        setProceed(false)
        handleClose()
    }

    const onChange = e => {
        setPassword({current: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        deleteAccount(user._id, password)
        setProceed(false)
        handleClose()
    }

    if(proceed){
        return (
        <Fragment>
            <h3>Delete account</h3>
            <form onSubmit={onSubmit} className='delete-account-form'>
                <label className='hidden' htmlFor="current">Password</label>
                <input className='form-input' type="password" name="current" id="current" value={password.current} onChange={onChange} placeholder='Password' />
                <div className="btn-group">
                    <input className='btn btn-red' type="submit" value="Delete"/>
                    <button className='btn btn-grey' onClick={cancel}>Cancel</button>
                </div>
            </form>
        </Fragment>)
    }

    return (
        <Fragment>
            <h3>Warning</h3>
            <p>This action will permanently delete all books, posts, and all other data associated with your account. Do you wish to proceed?</p>
            <button className='btn btn-grey' onClick={() => setProceed(true)}>Proceed</button>
            
        </Fragment>
    )
}
const mapStateToProps = state => ({
    authState: state.auth
})
const addState = connect(mapStateToProps, {deleteAccount})
export default addState(DeleteAccountForm)

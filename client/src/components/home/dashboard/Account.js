import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from "../../Modal";
import ChangePasswordForm from './account/ChangePasswordForm';
import UpdateProfileForm from './account/UpdateProfileForm';
import DeleteAccountForm from "./account/DeleteAccountForm"
import blank from "./account/blank-profile-photo-lg.jpeg";
import cloudinary from "../../../utils/cloudinary"
import Spinner from "../../Spinner";
import {openModal, closeModal } from "../../../actions/modalActions";

const Account = ({authState, openModal, closeModal}) => {
    const [changePWModal, setChangePWModal] = useState({show: false})
    const showChangePWModal = () => {
        setChangePWModal({show: true})
        openModal()
    }
    const hideChangePWModal = () => {
        setChangePWModal({show: false})
        closeModal()
    }
    const [updatePicModal, setUpdatePicModal] = useState({show: false})
    const showUpdatePicModal = () => {
        setUpdatePicModal({show: true})
        openModal()
    }
    const hideUpdatePicModal = () => {
        setUpdatePicModal({show: false})
        closeModal()
    }
    const [deleteAccountModal, setDeleteAccountModal] = useState({show: false})
    const showDeleteAccountModal = () => {
        setDeleteAccountModal({show: true})
        openModal()
    }
    const hideDeleteAccountModal = () => {
        setDeleteAccountModal({show: false})
        closeModal()
    }

    const { user, loading } = authState
    return (
        <div className='card'>
            { user && <h2>{user.name}</h2>}
            { loading && <Spinner/>}
            { user && !loading && <img className='profile profile-lg' src={ user.profilePic? cloudinary.large(user.profilePic.url) : blank }/>}
            <div className="btn-group">
                <button onClick={showUpdatePicModal} className="btn btn-yellow">Upload picture</button>
                <button onClick={showChangePWModal} className="btn btn-grey">Change password</button>
                <button onClick={showDeleteAccountModal} className="btn btn-red">Delete account</button>
            </div>
            <Modal show={changePWModal.show} handleClose={hideChangePWModal} Component={ChangePasswordForm}/>
            <Modal show={updatePicModal.show} handleClose={hideUpdatePicModal} Component={UpdateProfileForm}/>
            <Modal show={deleteAccountModal.show} handleClose={hideDeleteAccountModal} Component={DeleteAccountForm}/>
        </div>
    )
}

Account.propTypes = {
    authState: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth
})

const addState = connect(mapStateToProps, {openModal, closeModal});

export default addState(Account)

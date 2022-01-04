import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from "../../Modal";
import ChangePasswordForm from './account/ChangePasswordForm';
import UpdateProfileForm from './account/UpdateProfileForm';
import blank from "./account/blank-profile-photo-lg.jpeg";
import cloudinary from "../../../utils/cloudinary"
import Spinner from "../../Spinner"

const Account = ({authState}) => {
    const [changePWModal, setChangePWModal] = useState({show: false})
    const showChangePWModal = () => {
        setChangePWModal({show: true})
    }
    const hideChangePWModal = () => {
        setChangePWModal({show: false})
    }
    const [updatePicModal, setUpdatePicModal] = useState({show: false})
    const showUpdatePicModal = () => {
        setUpdatePicModal({show: true})
    }
    const hideUpdatePicModal = () => {
        setUpdatePicModal({show: false})
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
                <button className="btn btn-red">Delete account</button>
            </div>
            <Modal show={changePWModal.show} handleClose={hideChangePWModal} Component={ChangePasswordForm}/>
            <Modal show={updatePicModal.show} handleClose={hideUpdatePicModal} Component={UpdateProfileForm}/>
        </div>
    )
}

Account.propTypes = {
    authState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth
})

const addState = connect(mapStateToProps);

export default addState(Account)

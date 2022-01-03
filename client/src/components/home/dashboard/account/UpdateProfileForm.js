import React, { Fragment, useState } from 'react'
import { connect } from "react-redux";
import { uploadPicture } from '../../../../actions/authActions';
import { setAlert } from "../../../../actions/alertActions";

const UpdateProfileForm = ({authState, uploadPicture, setAlert, handleClose }) => {

    const [file, setFile] = useState();

    const { user } = authState

    const onChange = e => {
        setFile(e.target.files[0]);
    }

    const onSubmit = e => {
        e.preventDefault()
        if(file){
            uploadPicture(user._id, file)
        } else{
            setAlert("You must select a file first.", "danger")
        }
        handleClose();
    }
    return (
        <Fragment>
            <h3>Upload Profile Picture</h3>
            <form onSubmit={onSubmit}>
                <label className='hidden' htmlFor="file">Choose Picture</label>
                <input type="file" name="file" id="file" onChange={onChange} />
                <input className='btn btn-yellow' type="submit" value="upload" />
            </form>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    authState: state.auth
})

const addState = connect(mapStateToProps, {uploadPicture, setAlert });

export default addState(UpdateProfileForm);
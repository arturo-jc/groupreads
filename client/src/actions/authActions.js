import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPLOAD_SUCCESS,
    UPLOAD_FAIL,
    SET_LOADING,
    CHANGE_PASSWORD_FAIL,
    DELETE_ACCOUNT_FAIL
} from "./types";
import { setAlert } from "./alertActions"

// Load User
export const loadUser = () => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    //Set loading to true while waiting for server response
    dispatch(setLoading())

    try {
        // Request user data from backend
        const res = await axios.get("/api/auth");

        // If request approved, add user data to state,
        // set isAuthenticated to true
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.errors
        })
    }
}

// Register User
export const register = (user) => async dispatch => {

    // Config request headers
    const config = {
        headers: { "Content-Type": "application/json" }
    }

    //Set loading to true while waiting for server response
    dispatch(setLoading())

    try {
        // Send user to backend for registration
        // Expect token in return
        const res = await axios.post("/api/users", user, config);

        // If registration successful, add token to state,
        // set isAuthenticated to true
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        // Get user data from backend
        dispatch(loadUser());

    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
        })
    }

}

// Change password
export const changePasswords = (userId, passwords) => async dispatch => {

    // Config request headers
    const config = {
        headers: { "Content-Type": "application/json" }
    }

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        await axios.put(`/api/users/${userId}/change-password`, passwords, config);

        dispatch(setAlert("Password successfully changed.", "success"));

    } catch (err) {
        dispatch({
            type: CHANGE_PASSWORD_FAIL,
            payload: err.response.data.msg
        })
    }
}

// Login User
export const login = (user) => async dispatch => {

    // Config request headers
    const config = {
        headers: { "Content-Type": "application/json" }
    }

    //Set loading to true while waiting for server response
    dispatch(setLoading())

    try {

        // Send user to backend for authentication,
        // Expect token in return
        const res = await axios.post("/api/auth", user, config);

        // If authentication successful, add token to state
        // Set isAuthenticated to true
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        // Get user data from backend
        dispatch(loadUser());

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        })
    }
}
// Logout
export const logout = () => { return { type: LOGOUT } }

// Set loading to true
export const setLoading = () => { return { type: SET_LOADING } }

export const uploadPicture = (userId, file) => async dispatch => {

    const formData = new FormData()
    formData.append("file", file)
    
    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    // Config request headers
    const config = {
        headers: { "Content-Type": "multipart/form-data" }
    }

    dispatch(setLoading());
    
    try{
        const res = await axios.put(`/api/users/${userId}/update-picture`, formData, config)
        const { user, profilePic } = res.data
        user.profilePic = profilePic
        dispatch({
            type: UPLOAD_SUCCESS,
            payload: user
        })
        dispatch(setAlert("Profile picture successfully updated.", "success"));

    } catch (err) {
        dispatch({
            type: UPLOAD_FAIL,
            payload: err.response.data.msg
        })
    }
}

// Delete account

export const deleteAccount = (userId, password) => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    
    // Config request headers
    const config = {
        headers: { "Content-Type": "application/json;charset=utf-8" }
    }
    
    dispatch(setLoading());

    try{
        await axios.post(`/api/users/${userId}?_method=DELETE`, password, config)
        dispatch(setAlert("Account successfully deleted. Goodbye.", "success"));
        dispatch({type: LOGOUT})
    } catch (err) {
        dispatch({
            type: DELETE_ACCOUNT_FAIL,
            payload: err.response.data.msg
        })
    }
}
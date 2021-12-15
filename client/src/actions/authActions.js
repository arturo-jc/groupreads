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
    CLEAR_ERRORS
} from "./types";

// Load User
export const loadUser = () => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

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
        dispatch({ type: AUTH_ERROR })
    }
}

// Register User
export const register = (user) => async dispatch => {

    // Config request headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }

    }
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

// Login User
export const login = (user) => async dispatch => {

    // Config request headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }

    }
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
export const logout = () => {
    return {
        type: LOGOUT
    }
}

// Clear errors
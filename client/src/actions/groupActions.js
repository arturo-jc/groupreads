import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_GROUPS,
    ADD_GROUP,
    SET_CURRENT_GROUP,
    CLEAR_GROUPS,
    CLEAR_CURRENT_GROUP,
    GROUPS_ERROR,
    SET_LOADING
} from "./types";

// Set current
export const setCurrentGroup = group => {
    return { type: SET_CURRENT_GROUP, payload: group }
}

// Get groups
export const getGroups = () => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    //Set loading to true while waiting for server response
    dispatch(setLoading)

    try {

        // Request groups from backend
        const res = await axios.get("/api/groups");

        // If request successful, update state
        dispatch({
            type: GET_GROUPS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: GROUPS_ERROR,
            payload: err.response.data.msg
        })
    };
}

// Create group
export const createGroup = (group) => async dispatch => {

    // Config request headers
    const config = {
        headers: { "Content-Type": "application/json" }
    }

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    //Set loading to true while waiting for server response
    dispatch(setLoading)

    try {

        // Send group data to backend for storage
        // Expect group in return
        const res = await axios.post("/api/groups", group, config)

        // If successful, add new group to state
        dispatch({
            type: ADD_GROUP,
            payload: res.data
        });

        return res.data;

    } catch (err) {
        dispatch({
            type: GROUPS_ERROR,
            payload: err.response.data.msg
        })
    }
}

// Clear groups
export const clearGroups = () => {
    return { type: CLEAR_GROUPS }
}

// Clear current
export const clearCurrentGroup = () => {
    return { type: CLEAR_CURRENT_GROUP }
}

// Set loading
export const setLoading = () => {
    return { type: SET_LOADING }
}
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_GROUPS,
    ADD_GROUP,
    SET_CURRENT_GROUP,
    CLEAR_GROUPS,
    CLEAR_CURRENT,
    GROUPS_ERROR
} from "./types";

// Set current
export const setCurrentGroup = group => {
    return {
        type: SET_CURRENT_GROUP,
        payload: group
    }
}

// Get groups
export const getGroups = () => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {

        // Request groups from backend
        const res = await axios.get("/api/groups");

        // If request successful, update state
        dispatch({
            type: GET_GROUPS,
            payload: res.data
        });

    } catch (err) {
        dispatch({ type: GROUPS_ERROR })
    };
}

// Create group
export const createGroup = (group) => async dispatch => {
    // Config request headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        // Send group data to backend for storage
        // Expect group in return
        const res = await axios.post("/api/groups", group, config)

        // If successful, add new group to state
        dispatch({
            type: ADD_GROUP,
            payload: res.data
        });

        // Set new group as current
        setCurrentGroup(res.data);

    } catch (err) {
        dispatch({ type: GROUPS_ERROR })
    }
}

// Clear groups
export const clearGroups = () => {
    return { type: CLEAR_GROUPS }
}

// Clear current
export const clearCurrent = () => {
    return { type: CLEAR_CURRENT }
}
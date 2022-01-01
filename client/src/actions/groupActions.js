import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_GROUPS,
    ADD_GROUP,
    DELETE_GROUP,
    SET_CURRENT_GROUP,
    CLEAR_GROUPS,
    CLEAR_CURRENT_GROUP,
    FIND_GROUP,
    CLEAR_GROUP_SEARCH_RESULTS,
    GROUPS_ERROR,
    LOADING_GROUPS
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
    dispatch(loadingGroups());

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

// Delete group
export const deleteGroup = groupId => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {

        // Send group id to server for deletion
        await axios.delete(`/api/groups/${groupId}`)

        // If successful, add new group to state
        dispatch({
            type: DELETE_GROUP,
            payload: groupId
        });
        
    } catch (err) {
        dispatch({
            type: GROUPS_ERROR,
            payload: err.response.data.msg
        })
    }
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

    try {

        // Send group data to server for storage
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

// Clear group search results
export const clearGroupSearchResults = () => {
    return { type: CLEAR_GROUP_SEARCH_RESULTS }
}

// Set loading
export const loadingGroups = () => {
    return { type: LOADING_GROUPS }
}

// Find group
export const findGroup = groupId => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        // Request group from server
        const res = await axios.get(`/api/groups/${groupId}`)

        dispatch({
            type: FIND_GROUP,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: GROUPS_ERROR,
            payload: err.response.data.msg
        })
    }
}
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_GROUPS,
    ADD_GROUP,
    DELETE_GROUP,
    SET_CURRENT_GROUP,
    ADD_MEMBER,
    CLEAR_GROUPS,
    CLEAR_CURRENT_GROUP,
    FIND_GROUP,
    CLEAR_GROUP_SEARCH_RESULTS,
    GROUPS_ERROR,
    LOADING_GROUPS,
    DECLINE_REQUEST,
    LEAVE_GROUP
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
        // Expect deleted group back
        const res = await axios.delete(`/api/groups/${groupId}`)

        // If successful, delete group from state
        dispatch({
            type: DELETE_GROUP,
            payload: res.data
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

// Request to join a group
export const sendRequest = groupId => async dispatch => {
  
    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        await axios.put(`/api/groups/${groupId}/request`)

    } catch (err) {
        dispatch({
            type: GROUPS_ERROR,
            payload: err.response.data.msg
        })
    }
}

// Accept request
export const acceptRequest = (groupId, userId) => async dispatch => {

    // Config request headers
    const config = {
        headers: { "Content-Type": "application/json" }
    }

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {

        // Send user Id to server
        // Expect updated group in return
        const res = await axios.put(`/api/groups/${groupId}/accept`, {userId}, config)

        // If successful, add updated group to state
        dispatch({
            type: ADD_MEMBER,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: GROUPS_ERROR,
            payload: err.response.data.msg
        })
    }
}

// Decline request
export const declineRequest = (groupId, userId) => async dispatch => {
    // Config request headers
    const config = {
        headers: { "Content-Type": "application/json" }
    }

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try{
        
        // Send user Id to server
        // Expect updated group in return
        const res = await axios.put(`/api/groups/${groupId}/decline`, {userId}, config)

        // If successful, add updated group to state
        dispatch({
            type: DECLINE_REQUEST,
            payload: res.data
        });


    } catch (err) {
        dispatch({
            type: GROUPS_ERROR,
            payload: err.response.data.msg
        })
    }
}

// leave group
export const leaveGroup = params => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try{
        // Request user to remove user from group
        // Expect updated group in return
        const res = await axios.put(`/api/groups/${params.groupId}/leave`)

        // Remove group from state
        dispatch({
            type: LEAVE_GROUP,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: GROUPS_ERROR,
            payload: err.response.data.msg
        })
    }
}
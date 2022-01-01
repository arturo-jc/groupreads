import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_RECORDS,
    ADD_RECORD,
    DELETE_RECORD,
    SET_CURRENT_RECORD,
    CLEAR_RECORDS,
    CLEAR_CURRENT_RECORD,
    RECORDS_ERROR,
    LOADING_RECORDS
} from "./types"

// Get records for group
export const getRecordsFor = (group) => async dispatch => {

    // Config request headers
    const config = {
        headers: { "Content-Type": "application/json" }
    }

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    //Set loading to true while waiting for server response
    dispatch(loadingRecords());

    try {
        const res = await axios.get(`/api/groups/${group._id}/records`, config);

        dispatch({
            type: GET_RECORDS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: RECORDS_ERROR,
            payload: err.response.data.msg
        })
    }
}

// Set current record
export const setCurrentRecord = record => {
    return {
        type: SET_CURRENT_RECORD,
        payload: record
    }
}

// Add a record
export const addRecord = (bookId, groupId) => async dispatch => {

    // Config request headers
    const config = {
        headers: { "Content-Type": "application/json" }
    }

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    //Set loading to true while waiting for server response
    dispatch(loadingRecords());

    try {
        // Send book id to backend to create new record
        // Expect record back
        const res = await axios.post(`/api/groups/${groupId}/records`, { bookId }, config);

        // If successful, add resulting record to state
        dispatch({
            type: ADD_RECORD,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: RECORDS_ERROR,
            payload: err.response.data.msg
        })
    };
}

// Delete record
export const deleteRecord = (groupId, recordId) => async dispatch => {
    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        // Send record id to server for deletion
        await axios.delete(`/api/groups/${groupId}/records/${recordId}`);

        // If successful, add resulting record to state
        dispatch({
            type: DELETE_RECORD,
            payload: recordId
        })

        dispatch(clearCurrentRecord());

    } catch (err) {
        dispatch({
            type: RECORDS_ERROR,
            payload: err.response.data.msg
        })
    };
}

// Clear records
export const clearRecords = () => {
    return { type: CLEAR_RECORDS }
}

// Clear current record
export const clearCurrentRecord = () => {
    return {type: CLEAR_CURRENT_RECORD}
}

// Set loading
export const loadingRecords = () => { return { type: LOADING_RECORDS } }
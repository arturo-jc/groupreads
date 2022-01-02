import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    ADD_RECORD,
    DELETE_RECORD,
    SET_CURRENT_RECORD,
    CLEAR_RECORDS,
    CLEAR_CURRENT_RECORD,
    RECORDS_ERROR,
    LOADING_RECORDS
} from "./types"

// Get record
export const getRecord = (groupId, recordId) => async dispatch => {
    
    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    dispatch(loadingRecords());

    try {
        // Request record details from backend
        const res = await axios.get(`/api/groups/${groupId}/records/${recordId}`);

        // If successful, set as current record
        dispatch({
            type: SET_CURRENT_RECORD,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: RECORDS_ERROR,
            payload: err.response.data.msg
        })
    };
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
        // Send book id to backend to create new record and add to group
        // Expect group back
        const res = await axios.post(`/api/groups/${groupId}/records`, { bookId }, config);

        // Update group state
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
        // Expect parent group in return
        const res = await axios.delete(`/api/groups/${groupId}/records/${recordId}`);

        // If successful, update group state
        dispatch({
            type: DELETE_RECORD,
            payload: res.data
        })

        dispatch(clearCurrentRecord());

    } catch (err) {
        dispatch({
            type: RECORDS_ERROR,
            payload: err.response.data.msg
        })
    };
}


// Clear current record
export const clearCurrentRecord = () => {
    return {type: CLEAR_CURRENT_RECORD}
}

// Set loading
export const loadingRecords = () => { return { type: LOADING_RECORDS } }
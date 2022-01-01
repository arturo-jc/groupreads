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

// Modify so that it modifies groupState instead of recordState
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

        // If successful, update group state
        const payload = {
            groupId,
            record: res.data
        }

        dispatch({
            type: ADD_RECORD,
            payload
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

        // If successful, update group state
        const payload = { groupId, recordId }
        
        dispatch({
            type: DELETE_RECORD,
            payload
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
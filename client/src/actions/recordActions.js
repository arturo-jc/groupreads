import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_RECORDS,
    ADD_RECORD,
    SET_CURRENT_RECORD,
    RECORDS_ERROR,
    SET_LOADING
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
    dispatch(setLoading);

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
    dispatch(setLoading);

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

// Set loading
export const setLoading = () => { return { type: SET_LOADING } }
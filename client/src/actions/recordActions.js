import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_RECORDS,
    ADD_RECORD,
    SET_CURRENT_RECORD
} from "./types"

// Get records for group
export const getRecordsFor = (group) => async dispatch => {

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
        const res = await axios.get(`/api/groups/${group._id}/records`, config);

        dispatch({
            type: GET_RECORDS,
            payload: res.data
        })

    } catch (err) {

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
export const addRecord = recordData => async dispatch => {
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

    // Get volumeInfo to create new record
    // Get groupId to attach record to selected group
    const { volumeInfo, groupId } = recordData;

    try {
        // Send volume info to backend
        // Expect book in return
        // const booksRes = await axios.post("/api/books", volumeInfo, config);
        // const newBook = booksRes.data;

        // If successful, send book id to backend
        // In order to create new record and add to selected group 
        // const newBookId = {
        //     bookId: newBook._id
        // }
        const newBookId = {
            bookId: "61bc22bb3c8e906f36b8743d"
        }
        const recordsRes = await axios.post(`/api/groups/${groupId}/records`, newBookId, config);
        console.log(recordsRes.data);
        // If successful, add resulting record to state
        dispatch({
            type: ADD_RECORD,
            payload: recordsRes.data
        })

    } catch (err) {


    }

}
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import formatBookData from "../utils/formatBookData"
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

    } catch (err) { dispatch({ type: RECORDS_ERROR }) }
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
        headers: { "Content-Type": "application/json" }
    }

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    // Get volumeInfo to create new record
    // Get groupId to attach record to selected group
    const { rawBookData, groupId } = recordData;

    // Format book data to comply with backend validation
    const bookData = formatBookData(rawBookData)

    //Set loading to true while waiting for server response
    dispatch(setLoading);

    try {
        // Send book data to backend
        // Expect book in return
        const booksRes = await axios.post("/api/books", bookData, config);
        const newBook = booksRes.data;

        // If successful, send book id to backend
        // In order to create new record and add to selected group 
        const newBookId = { bookId: newBook._id }

        const recordsRes = await axios.post(`/api/groups/${groupId}/records`, newBookId, config);
        console.log(recordsRes.data);

        // If successful, add resulting record to state
        dispatch({
            type: ADD_RECORD,
            payload: recordsRes.data
        })
    } catch (err) {
        console.log(err);
        dispatch({ type: RECORDS_ERROR })
    };
}

// Set loading
export const setLoading = () => {
    return { type: SET_LOADING }
}
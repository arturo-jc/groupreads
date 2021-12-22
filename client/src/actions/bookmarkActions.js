import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_BOOKMARKS,
    ADD_BOOKMARK,
    BOOKMARKS_ERROR,
    SET_LOADING
} from "./types";

// get bookmarks for given record
export const getBookmarksFor = (groupId, record) => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    //Set loading to true while waiting for server response
    dispatch(setLoading);

    try {
        // Request bookmarks from server
        const res = await axios.get(`/api/groups/${groupId}/records/${record._id}/bookmarks`)
        dispatch({
            type: GET_BOOKMARKS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: BOOKMARKS_ERROR,
            payload: err.response.data.msg
        })
    }
}

// add bookmark
export const addBookmark = (groupId, recordId, bookmark) => async dispatch => {

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
        // Send bookmark data to server
        // Expect bookmark in return
        const res = await axios.post(`/api/groups/${groupId}/records/${recordId}/bookmarks`, bookmark, config);

        // If successful, add bookmark to state
        dispatch({
            type: ADD_BOOKMARK,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: BOOKMARKS_ERROR,
            payload: err.response.data.msg
        })
    }
}

// Set loading
export const setLoading = () => { return { type: SET_LOADING } }
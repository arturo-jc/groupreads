import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_BOOKMARKS,
    ADD_BOOKMARK,
    CLEAR_BOOKMARKS,
    BOOKMARKS_ERROR,
    LOADING_BOOKMARKS
} from "./types";

// get bookmarks for given record
export const getBookmarksFor = (groupId, record) => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    //Set loading to true while waiting for server response
    dispatch(loadingBookmarks());

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
    dispatch(loadingBookmarks());

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

// Clear bookmarks
export const clearBookmarks = () => { return { type: CLEAR_BOOKMARKS }}

// Set loading
export const loadingBookmarks = () => { return { type: LOADING_BOOKMARKS } }
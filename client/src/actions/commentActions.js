import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    SET_LOADING,
    COMMENT_ERROR
} from "./types"

// Add comment to post
export const addComment = (groupId, recordId, postId, comment) => async dispatch => {
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

    const endpoint = `/api/groups/${groupId}/records/${recordId}/posts/${postId}/comments`;

    try {
        await axios.post(endpoint, comment, config);

    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: err.response.data.msg
        })
    }
}

// Delete comment from post
export const deleteComment = (groupId, recordId, postId, commentId) => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        await axios.delete(`/api/groups/${groupId}/records/${recordId}/posts/${postId}/comments/${commentId}`);
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: err.response.data.msg
        })
    }
}


// Set loading
export const setLoading = () => { return { type: SET_LOADING } }
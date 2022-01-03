import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    ADD_COMMENT,
    DELETE_COMMENT,
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

    const endpoint = `/api/groups/${groupId}/records/${recordId}/posts/${postId}/comments`;

    try {
        const res = await axios.post(endpoint, comment, config);

        const { post, comment: newComment } = res.data;
        post.comments.push(newComment);
        console.log(post)

        dispatch({
            type: ADD_COMMENT,
            payload: post
        })

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

        const res = await axios.delete(`/api/groups/${groupId}/records/${recordId}/posts/${postId}/comments/${commentId}`);
   
        dispatch({
            type: DELETE_COMMENT,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: err.response.data.msg
        })
    }
}


// Set loading
export const setLoading = () => { return { type: SET_LOADING } }
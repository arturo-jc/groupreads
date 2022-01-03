import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_POSTS,
    ADD_POST,
    DELETE_POST,
    CLEAR_POSTS,
    POSTS_ERROR,
    LOADING_POSTS
} from "./types";

// get posts for given record
export const getPostsFor = (groupId, recordId) => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    //Set loading to true while waiting for server response
    dispatch(loadingPosts());

    try {
        // Request posts from server
        const res = await axios.get(`/api/groups/${groupId}/records/${recordId}/posts`);
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: err.response.data.msg
        })
    }
}

// add posts
export const addPost = (groupId, recordId, post) => async dispatch => {

    // Config request headers
    const config = {
        headers: { "Content-Type": "application/json" }
    }

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        // Send post data to server for storage
        // Expect post in return
        const res = await axios.post(`/api/groups/${groupId}/records/${recordId}/posts`, post, config)

        // If successful, add post to state
        dispatch({
            type: ADD_POST,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: err.response.data.msg
        })
    }
}

// delete post
export const deletePost = (groupId, recordId, postId) => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        // Send post id to server for deletion
        const res = await axios.delete(`/api/groups/${groupId}/records/${recordId}/posts/${postId}`)

        // If successful, add post to state
        dispatch({
            type: DELETE_POST,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: err.response.data.msg
        })
    }
}




// Clear posts
export const clearPosts = () => { return {type: CLEAR_POSTS}}

// Set loading
export const loadingPosts = () => { return { type: LOADING_POSTS } }
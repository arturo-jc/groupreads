import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    SET_LOADING,
    COMMENT_ERROR
} from "./types"

// Get all comments on record
// export const GetRecordComments = (groupId, record) => async dispatch => {

//     // Add token to request headers for authentication
//     if (localStorage.token) {
//         setAuthToken(localStorage.token)
//     }

//     //Set loading to true while waiting for server response
//     dispatch(setLoading);
//     try {
//         // Request comments from server
//         const res = await axios.get(`/api/groups/${groupId}/records/${record._id}/comments`);
//         dispatch({
//             type: GET_RECORD_COMMENTS,
//             payload: res.data
//         });

//     } catch (err) {
//         dispatch({
//             type: COMMENT_ERROR,
//             payload: err.response.data.msg
//         })
//     }
// }

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
        // dispatch({
        //     type: ADD_COMMENT,
        //     payload: res.data
        // })

    } catch (err) {
        console.dir(err)
        dispatch({
            type: COMMENT_ERROR,
            payload: err.response.data.msg
        })
    }
}

// Set loading
export const setLoading = () => { return { type: SET_LOADING } }
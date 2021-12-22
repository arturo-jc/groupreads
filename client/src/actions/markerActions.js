import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_MARKERS,
    ADD_MARKER,
    MARKERS_ERROR,
    SET_LOADING
} from "./types";

// get markers for given record
export const getMarkersFor = (groupId, record) => async dispatch => {
    console.log("hit action")
    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    //Set loading to true while waiting for server response
    dispatch(setLoading);

    try {
        // Request markers from server
        const res = await axios.get(`/api/groups/${groupId}/records/${record._id}/markers`)
        dispatch({
            type: GET_MARKERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: MARKERS_ERROR,
            payload: err.response.data.msg
        })
    }
}

// add markers
export const addMarker = (groupId, recordId, marker) => async dispatch => {

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
        // Send marker data to server
        // Expect marker in return
        const res = await axios.post(`/api/groups/${groupId}/records/${recordId}/markers`, marker, config);

        // If successful, add marker to state
        dispatch({
            type: ADD_MARKER,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: MARKERS_ERROR,
            payload: err.response.data.msg
        })
    }
}

// Set loading
export const setLoading = () => { return { type: SET_LOADING } }
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_MARKERS,
    ADD_MARKER,
    MARKERS_ERROR,
    CLEAR_MARKERS,
    LOADING_MARKERS,
    DELETE_MARKER
} from "./types";

// get markers for given record
export const getMarkersFor = (groupId, record) => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    //Set loading to true while waiting for server response
    dispatch(loadingMarkers());

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


// delete marker
export const deleteMarker = (groupId, recordId, markerId) => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        // Send marker id to server for deletion
        await axios.delete(`/api/groups/${groupId}/records/${recordId}/markers/${markerId}`);

        // If successful, add marker to state
        dispatch({
            type: DELETE_MARKER,
            payload: markerId
        });
    } catch (err) {
        dispatch({
            type: MARKERS_ERROR,
            payload: err.response.data.msg
        })
    }
}

// Clear markers
export const clearMarkers = () => { return { type: CLEAR_MARKERS }}

// Set loading
export const loadingMarkers = () => { return { type: LOADING_MARKERS } }
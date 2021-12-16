import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_GROUPS,
    ADD_GROUP,
    GROUPS_ERROR
} from "./types";

// Get groups
export const getGroups = () => async dispatch => {

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {

        // Request groups from backend
        const res = await axios.get("/api/groups");

        // If request successful, update state
        dispatch({
            type: GET_GROUPS,
            payload: res.data
        });

    } catch (err) {
        dispatch({ type: GROUPS_ERROR })
    };
}

// Create group
export const createGroup = (group) => async dispatch => {
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
        // Send group data to backend for storage
        // Expect group in return
        const res = await axios.post("/api/groups", group, config)
        console.log("made call to api/groups")

        // If successful, add group to state
        dispatch({
            type: ADD_GROUP,
            payload: res.data
        })

    } catch (err) {
        dispatch({ type: GROUPS_ERROR })
    }
}


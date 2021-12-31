import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import formatBookData from "../utils/formatBookData"
import {
    SEARCH,
    SET_CURRENT_RESULT,
    CLEAR_RESULTS,
    CLEAR_CURRENT_RESULT,
    SEARCH_ERROR,
    RESULTS_LOADING
} from "./types";

export const setCurrentResult = result => {
    return {
        type: SET_CURRENT_RESULT,
        payload: result
    }
}

export const saveResult = bookData => async dispatch => {

    // Config request headers
    const config = {
        headers: { "Content-Type": "application/json" }
    }

    // Add token to request headers for authentication
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    // Format book data to comply with backend validation
    const book = formatBookData(bookData)

    try {
        // Send book data to backend
        // Expect book in return
        const res = await axios.post("/api/books", book, config);
        return res.data;

    } catch (err) {
        dispatch({
            type: SEARCH_ERROR,
            payload: err.response.data.msg
        })
    }
}

export const search = query => async dispatch => {

    // Define endpoint
    const baseUrl = "https://books.googleapis.com/books/v1/volumes";
    const maxResults = 15;
    const params = `?q=${query.text}&maxResults=${maxResults}`;
    const endpoint = baseUrl + params;

    // Remove auth token from headers
    setAuthToken();

    // Set loading to true while waiting for response
    dispatch(resultsLoading())

    try {
        // Get books from Google Books API
        const res = await axios.get(endpoint);

        // If successful, add results to result state
        dispatch({
            type: SEARCH,
            payload: res.data.items
        })

    } catch (err) {
        dispatch({
            type: SEARCH_ERROR,
            payload: err.response.data.error.message
        })
    }
}

// Clear results
export const clearResults = () => {
    return { type: CLEAR_RESULTS }
}

// Clear current result
export const clearCurrentResult = () => {
    return {type: CLEAR_CURRENT_RESULT}
}

// Set loading
export const resultsLoading = () => {
    return { type: RESULTS_LOADING }
}
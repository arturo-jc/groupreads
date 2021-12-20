import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
    GET_BOOKS,
    CLEAR_BOOKS,
    BOOKS_ERROR,
    SET_LOADING
} from "./types";


export const getBooks = query => async dispatch => {

    // Define endpoint
    const baseUrl = "https://books.googleapis.com/books/v1/volumes";
    const maxResults = 15;
    const params = `?q=${query.text}&maxResults=${maxResults}`;
    const endpoint = baseUrl + params;

    // Remove auth token from headers
    setAuthToken();

    // Set loading to true while waiting for response
    dispatch(setLoading)

    try {
        // Get books from Google Books API
        const res = await axios.get(endpoint);

        // If successful, add results to result state
        dispatch({
            type: GET_BOOKS,
            payload: res.data.items
        })

    } catch (err) { dispatch({ type: BOOKS_ERROR }) }
}

export const clearBooks = () => {
    return { type: CLEAR_BOOKS }
}

export const setLoading = () => {
    return { type: SET_LOADING }
}
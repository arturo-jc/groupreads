import axios from "axios";
import {
    SEARCH_BOOKS,
    CLEAR_BOOKS,
    BOOKS_ERROR,
    SET_LOADING
} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const searchBooks = book => async dispatch => {
    try {

        setAuthToken();
        const baseUrl = "https://books.googleapis.com/books/v1/volumes";
        const maxResults = 15;
        const params = `?q=${book.name}&maxResults=${maxResults}`;
        const endpoint = baseUrl + params;
        const res = await axios.get(endpoint);

        dispatch({
            type: SEARCH_BOOKS,
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
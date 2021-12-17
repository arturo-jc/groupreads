import axios from "axios";
import {
    SEARCH_BOOKS
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

    } catch (err) {

    }
}
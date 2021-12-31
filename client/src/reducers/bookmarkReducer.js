import {
    GET_BOOKMARKS,
    ADD_BOOKMARK,
    CLEAR_BOOKMARKS,
    BOOKMARKS_ERROR,
    LOADING_BOOKMARKS,
    CLEAR_ERRORS
} from "../actions/types";

const initialState = {
    bookmarks: [],
    loading: false,
    error: null
}

const bookmarkReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOKMARK:
            return {
                ...state,
                bookmarks: [...state.bookmarks, action.payload],
                loading: false
            }
        case GET_BOOKMARKS:
            return {
                ...state,
                bookmarks: action.payload,
                loading: false
            }
        case LOADING_BOOKMARKS:
            return {
                ...state,
                loading: true
            }
        case BOOKMARKS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case CLEAR_BOOKMARKS:
            return {
                ...state,
                bookmarks: []
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export default bookmarkReducer;
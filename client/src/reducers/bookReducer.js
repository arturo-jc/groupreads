import {
    SEARCH_BOOKS,
    CLEAR_BOOKS,
    SET_LOADING
} from "../actions/types";

const initialState = {
    books: null,
    loading: false,
    error: null
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_BOOKS:
            return {
                ...state,
                books: action.payload,
                loading: false
            }
        case CLEAR_BOOKS:
            return {
                ...state,
                books: null
            }
        case SET_LOADING:
            console.log("SET_LOADING called on bookReducer")
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default bookReducer;

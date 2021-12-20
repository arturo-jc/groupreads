import {
    GET_BOOKS,
    CLEAR_BOOKS,
    BOOKS_ERROR,
    SET_LOADING
} from "./../actions/types";

const initialState = {
    books: [],
    current: null,
    loading: false,
    error: null
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
                loading: false
            }
        case CLEAR_BOOKS:
            return {
                ...state,
                books: []
            }
        case BOOKS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default bookReducer;
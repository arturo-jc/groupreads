import {
    SEARCH_BOOKS
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
        default:
            return state;
    }
}

export default bookReducer;

import {
    SEARCH,
    SET_CURRENT_RESULT,
    CLEAR_RESULTS,
    SEARCH_ERROR,
    SET_LOADING,
    CLEAR_ERRORS
} from "./../actions/types";

const initialState = {
    results: [],
    current: null,
    loading: false,
    error: null
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                results: action.payload,
                loading: false
            }
        case SET_CURRENT_RESULT:
            return {
                ...state,
                current: action.payload,
                loading: false
            }
        case CLEAR_RESULTS:
            return {
                ...state,
                results: []
            }
        case SEARCH_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
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

export default searchReducer;
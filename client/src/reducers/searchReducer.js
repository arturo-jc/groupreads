import {
    SEARCH,
    SET_CURRENT_RESULT,
    CLEAR_RESULTS,
    CLEAR_CURRENT_RESULT,
    SEARCH_ERROR,
    RESULTS_LOADING,
    CLEAR_ERRORS,
    LOGOUT
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
        case CLEAR_CURRENT_RESULT:
            return {
                ...state,
                current: null
            }
        case SEARCH_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case RESULTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case LOGOUT:
            return initialState
        default:
            return state;
    }
}

export default searchReducer;
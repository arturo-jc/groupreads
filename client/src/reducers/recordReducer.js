import {
    LOADING_RECORDS,
    ADD_RECORD,
    SET_CURRENT_RECORD,
    CLEAR_CURRENT_RECORD,
    RECORDS_ERROR,
    CLEAR_ERRORS
} from "../actions/types";

const initialState = {
    current: null,
    loading: false,
    error: null
}

const recordReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RECORD:
            return {
                ...state,
                loading: false
            }
        case SET_CURRENT_RECORD:
            return {
                ...state,
                current: action.payload,
                loading: false
            }
        case LOADING_RECORDS:
            return {
                ...state,
                loading: true
            }
        case RECORDS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case CLEAR_CURRENT_RECORD:
            return {
                ...state,
                current: null
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

export default recordReducer;
import {
    GET_RECORDS,
    ADD_RECORD,
    DELETE_RECORD,
    SET_CURRENT_RECORD,
    LOADING_RECORDS,
    RECORDS_ERROR,
    CLEAR_RECORDS,
    CLEAR_CURRENT_RECORD,
    CLEAR_ERRORS
} from "../actions/types";

const initialState = {
    records: [],
    current: null,
    loading: false,
    error: null
}

const recordReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECORDS:
            return {
                ...state,
                records: action.payload,
                loading: false
            }
        case ADD_RECORD:
            return {
                ...state,
                records: [...state.records, action.payload],
                loading: false
            }
        case DELETE_RECORD:
            return {
                ...state,
                records: state.records.filter(record => record._id !== action.payload)
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
        case CLEAR_RECORDS:
            return {
                ...state,
                records: []
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
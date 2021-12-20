import {
    GET_RECORDS,
    ADD_RECORD,
    SET_CURRENT_RECORD,
    SET_LOADING,
    RECORDS_ERROR
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
        case SET_CURRENT_RECORD:
            return {
                ...state,
                current: action.payload
            }
        case SET_LOADING:
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
        default:
            return state;
    }
}

export default recordReducer;
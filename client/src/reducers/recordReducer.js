import {
    GET_RECORDS,
    ADD_RECORD,
    SET_CURRENT_RECORD,
    SET_LOADING
} from "../actions/types";

const initialState = {
    records: null,
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
            console.log("SET_LOADING called on recordReducer")
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default recordReducer;
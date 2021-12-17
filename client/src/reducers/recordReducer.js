import {
    GET_RECORDS,
    ADD_RECORD,
    SET_CURRENT_RECORD
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
            console.log("Hit ADD_RECORD")
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
        default:
            return state;
    }
}

export default recordReducer;
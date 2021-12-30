import {
    GET_MARKERS,
    ADD_MARKER,
    MARKERS_ERROR,
    SET_LOADING,
    CLEAR_ERRORS
} from "../actions/types";

const initialState = {
    markers: [],
    loading: false,
    error: null
}

const markerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MARKER:
            return {
                ...state,
                markers: [...state.markers, action.payload],
                loading: false
            }
        case GET_MARKERS:
            return {
                ...state,
                markers: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case MARKERS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
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

export default markerReducer;
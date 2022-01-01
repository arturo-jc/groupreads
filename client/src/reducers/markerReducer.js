import {
    GET_MARKERS,
    ADD_MARKER,
    DELETE_MARKER,
    MARKERS_ERROR,
    LOADING_MARKERS,
    CLEAR_MARKERS,
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
        case LOADING_MARKERS:
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
        case DELETE_MARKER:
            return {
                ...state,
                markers: state.markers.filter(marker => marker._id !== action.payload)
            }
        case CLEAR_MARKERS:
            return {
                ...state,
                markers: []
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
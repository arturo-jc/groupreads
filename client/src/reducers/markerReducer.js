import {
    GET_MARKERS,
    ADD_MARKER,
    MARKERS_ERROR,
    SET_LOADING
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
        default:
            return state;
    }
}

export default markerReducer;
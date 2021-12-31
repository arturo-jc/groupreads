import {
    SET_LOADING,
    COMMENT_ERROR,
    CLEAR_ERRORS
} from "../actions/types";

const initialState = {
    loading: false,
    error: null
}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case COMMENT_ERROR:
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

export default commentReducer;
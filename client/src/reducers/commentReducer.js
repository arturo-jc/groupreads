import {
    SET_LOADING,
    GET_RECORD_COMMENTS,
    ADD_COMMENT,
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
        case GET_RECORD_COMMENTS:
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload],
                loading: false
            }
        default:
            return state;
    }

}

export default commentReducer;
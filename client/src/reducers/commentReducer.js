import {
    SET_LOADING,
    GET_RECORD_COMMENTS,
    ADD_COMMENT,
    COMMENT_ERROR
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
        case ADD_COMMENT:
        default:
            return state;
    }

}

export default commentReducer;
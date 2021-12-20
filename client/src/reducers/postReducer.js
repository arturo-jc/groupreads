import {
    GET_POSTS,
    ADD_POST,
    SET_CURRENT_POST,
    POSTS_ERROR,
    SET_LOADING
} from "../actions/types";

const initialState = {
    posts: [],
    current: null,
    loading: false,
    error: null
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
                loading: false
            }
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case POSTS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default postReducer;
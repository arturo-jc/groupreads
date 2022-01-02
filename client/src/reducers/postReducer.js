import {
    GET_POSTS,
    ADD_POST,
    DELETE_POST,
    POSTS_ERROR,
    LOADING_POSTS,
    CLEAR_POSTS,
    CLEAR_ERRORS,
    LOGOUT
} from "../actions/types";

const initialState = {
    posts: [],
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
        case LOADING_POSTS:
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
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        case CLEAR_POSTS:
            return {
                ...state,
                posts: []
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case LOGOUT:
            return initialState
        default:
            return state;
    }
}

export default postReducer;
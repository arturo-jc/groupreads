import {
    GET_GROUPS,
    ADD_GROUP,
    DELETE_GROUP,
    SET_CURRENT_GROUP,
    CLEAR_GROUPS,
    CLEAR_CURRENT_GROUP,
    CLEAR_ERRORS,
    FIND_GROUP,
    CLEAR_GROUP_SEARCH_RESULTS,
    GROUPS_ERROR,
    LOADING_GROUPS
} from "../actions/types";

const initialState = {
    groups: null,
    current: null,
    searchResult: null,
    loading: false,
    error: null
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_GROUP:
            return {
                ...state,
                current: action.payload
            }
        case GET_GROUPS:
            return {
                ...state,
                groups: action.payload,
                loading: false
            }
        case ADD_GROUP:
            return {
                ...state,
                groups: [...state.groups, action.payload],
                loading: false
            }
        case DELETE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(group => group._id !== action.payload)
            }
        case CLEAR_GROUPS:
            return {
                ...state,
                groups: null
            }
        case CLEAR_CURRENT_GROUP:
            return {
                ...state,
                current: null
            }
        case CLEAR_GROUP_SEARCH_RESULTS:
            return {
                ...state,
                searchResult: null
            }
        case FIND_GROUP:
            return {
                ...state,
                searchResult: action.payload,
                loading: false
            }
        case LOADING_GROUPS:
            return {
                ...state,
                loading: true
            }
        case GROUPS_ERROR:
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

export default groupReducer;
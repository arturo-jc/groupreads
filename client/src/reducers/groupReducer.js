import {
    GET_GROUPS,
    ADD_GROUP,
    SET_CURRENT_GROUP,
    CLEAR_GROUPS,
    CLEAR_CURRENT_GROUP,
    GROUPS_ERROR,
    SET_LOADING
} from "../actions/types";

const initialState = {
    groups: null,
    current: null,
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
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case GROUPS_ERROR:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default groupReducer;
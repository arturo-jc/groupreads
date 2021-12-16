import {
    GET_GROUPS,
    ADD_GROUP,
    GROUPS_ERROR
} from "../actions/types";

const initialState = {
    groups: null,
    current: null,
    loading: false,
    error: null
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
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
                current: action.payload,
                loading: false
            }
        case GROUPS_ERROR:
            console.error(action.payload);
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default groupReducer;
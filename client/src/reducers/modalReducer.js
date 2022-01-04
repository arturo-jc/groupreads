import {
    MODAL_OPEN,
    MODAL_CLOSED,
    LOGOUT
} from "../actions/types";

const initialState = false

const modalReducer = (state = initialState, action) => {
    switch (action.type){
        case MODAL_OPEN:
            return true
        case LOGOUT:
        case MODAL_CLOSED:
            return false
        default:
            return state;
    }
}

export default modalReducer;
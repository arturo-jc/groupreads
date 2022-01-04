import {v4 as uuidv4} from "uuid";
import {
    SET_ALERT,
    REMOVE_ALERT
} from "./types";

// set alert/ Should I make it async even though I'm not using await? We'll see
export const setAlert = (msg, type, timeout = 5000) => async dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: {msg, type, id}
    });
    setTimeout(()=>dispatch(removeAlert(id)), timeout);
}

export const removeAlert = alertId => {
    return {
        type: REMOVE_ALERT,
        payload: alertId
    }
}